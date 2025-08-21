import React from 'react';
import { Card, CardContent, CardHeader } from '../../ui/card';
import Heading from '../../ui/heading';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

const CustomerTrackParcel = () => {
  return (
    <section>
      <div className="container">
        <div className="space-y-10">
          <Card>
            <CardHeader>
              <Heading
                as="h4"
                className="section-title text-center relative pb-2.5"
              >
                Track Your Parcel
              </Heading>
            </CardHeader>
            <CardContent>
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2">
                  <Input placeholder="Enter your tracking number" />
                  <Button>Track</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CustomerTrackParcel;
