export interface PulsingDot {
  width: number;
  height: number;
  data: Uint8ClampedArray;
  context: CanvasRenderingContext2D | null;
  onAdd(): void;
  render(): boolean;
}
