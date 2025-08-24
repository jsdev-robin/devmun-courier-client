'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createSocket } from '../../lib/socket';

const customerSocket = createSocket('customer');

interface AgentData {
  agentId: string;
  location?: {
    lat: number;
    lng: number;
    speed: number;
    timestamp: number;
  };
  name?: string;
  status?: string;
  eta?: string;
  vehicle?: string;
}

const GetLiveTrackingMap = ({
  id,
}: // status,
// name,
{
  id: string;
  status?: string;
  name?: string;
}) => {
  const [agents, setAgents] = useState<Map<string, AgentData>>(new Map());
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY || '';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [90.4125, 23.8103],
      zoom: 10,
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!id) return;

    const agentIds = id.split(',');

    if (!customerSocket.connected) {
      customerSocket.connect();
    }

    // Join rooms for all agents
    agentIds.forEach((agentId) => {
      customerSocket.emit('joinCustomerRoom', agentId);
    });

    const allOnlineAgentsHandler = (agentsData: AgentData[]) => {
      const newAgents = new Map<string, AgentData>();
      agentsData.forEach((agent) => {
        newAgents.set(agent.agentId, agent);
      });
      setAgents(newAgents);
    };

    const locationUpdateHandler = (data: {
      agentId: string;
      lat: number;
      lng: number;
      speed: number;
    }) => {
      setAgents((prev) => {
        const newAgents = new Map(prev);
        const agent = newAgents.get(data.agentId) || { agentId: data.agentId };
        agent.location = {
          lat: data.lat,
          lng: data.lng,
          speed: data.speed,
          timestamp: Date.now(),
        };
        newAgents.set(data.agentId, agent);
        return newAgents;
      });
    };

    const agentOnlineHandler = (data: {
      agentId: string;
      location?: unknown;
    }) => {
      setAgents((prev) => {
        const newAgents = new Map(prev);
        newAgents.set(data.agentId, {
          agentId: data.agentId,
          location: data.location as {
            lat: number;
            lng: number;
            speed: number;
            timestamp: number;
          },
        });
        return newAgents;
      });
    };

    const agentOfflineHandler = (data: { agentId: string }) => {
      setAgents((prev) => {
        const newAgents = new Map(prev);
        newAgents.delete(data.agentId);
        return newAgents;
      });
    };

    customerSocket.on('allOnlineAgents', allOnlineAgentsHandler);
    customerSocket.on('locationUpdate', locationUpdateHandler);
    customerSocket.on('agentOnline', agentOnlineHandler);
    customerSocket.on('agentOffline', agentOfflineHandler);

    return () => {
      customerSocket.off('allOnlineAgents', allOnlineAgentsHandler);
      customerSocket.off('locationUpdate', locationUpdateHandler);
      customerSocket.off('agentOnline', agentOnlineHandler);
      customerSocket.off('agentOffline', agentOfflineHandler);
    };
  }, [id]);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    agents.forEach((agent, agentId) => {
      if (!agent.location) return;

      if (markersRef.current.has(agentId)) {
        const marker = markersRef.current.get(agentId);
        if (marker) {
          marker.setLngLat([agent.location.lng, agent.location.lat]);
        }
      } else {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.backgroundColor = '#3b82f6';
        el.style.borderRadius = '50%';
        el.style.boxShadow = '0 0 0 4px rgba(59, 130, 246, 0.4)';

        const marker = new mapboxgl.Marker(el)
          .setLngLat([agent.location.lng, agent.location.lat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<div class="p-2">
                  <h3 class="font-bold text-sm">${agent.name || 'Agent'}</h3>
                  <p class="text-xs"><strong>Status:</strong> ${
                    agent.status || 'Online'
                  }</p>
                  <p class="text-xs"><strong>Speed:</strong> ${
                    agent.location.speed
                  } km/h</p>
                </div>`,
            ),
          )
          .addTo(map);

        markersRef.current.set(agentId, marker);
      }
    });

    markersRef.current.forEach((marker, agentId) => {
      if (!agents.has(agentId)) {
        marker.remove();
        markersRef.current.delete(agentId);
      }
    });
  }, [agents]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-120 rounded-xl overflow-hidden border border-border"
    />
  );
};

export default GetLiveTrackingMap;
