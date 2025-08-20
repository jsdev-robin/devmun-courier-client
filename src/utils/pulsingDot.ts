interface PulsingDot {
  width: number;
  height: number;
  data: Uint8ClampedArray;
  context: CanvasRenderingContext2D | null;
  onAdd(): void;
  render(): boolean;
}

export const createPulsingDot = (map: mapboxgl.Map): PulsingDot => {
  const size = 100;

  const pulsingDot: PulsingDot = {
    width: size,
    height: size,
    data: new Uint8ClampedArray(size * size * 4),
    context: null,

    onAdd: function () {
      const canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext('2d');
    },

    render: function () {
      const duration = 1000;
      const t = (performance.now() % duration) / duration;
      const radius = (size / 2) * 0.3;
      const outerRadius = (size / 2) * 0.7 * t + radius;

      if (!this.context) return false;

      this.context.clearRect(0, 0, this.width, this.height);

      this.context.beginPath();
      this.context.arc(
        this.width / 2,
        this.height / 2,
        outerRadius,
        0,
        Math.PI * 2,
      );
      this.context.fillStyle = `rgba(255, 100, 100, ${1 - t})`;
      this.context.fill();

      this.context.beginPath();
      this.context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
      this.context.fillStyle = 'rgba(255, 0, 0, 1)';
      this.context.strokeStyle = 'white';
      this.context.lineWidth = 2 + 2 * (1 - t);
      this.context.fill();
      this.context.stroke();

      this.data = this.context.getImageData(0, 0, this.width, this.height).data;

      map.triggerRepaint();
      return true;
    },
  };

  return pulsingDot;
};
