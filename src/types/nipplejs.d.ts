declare module "nipplejs" {
  interface JoystickManagerOptions {
    zone: HTMLElement;
    mode?: "static" | "semi" | "dynamic";
    position?: { left?: string; top?: string; right?: string; bottom?: string };
    color?: string;
    size?: number;
    threshold?: number;
    fadeTime?: number;
    multitouch?: boolean;
    maxNumberOfNipples?: number;
    dataOnly?: boolean;
    restJoystick?: boolean;
    restOpacity?: number;
  }

  interface JoystickEventData {
    angle: {
      radian: number;
      degree: number;
    };
    direction: {
      x: string;
      y: string;
      angle: string;
    };
    distance: number;
    force: number;
    identifier: number;
    position: { x: number; y: number };
    pressure: number;
    vector: { x: number; y: number };
  }

  interface JoystickManager {
    on(
      event: "start" | "end" | "move" | "dir" | "dir:up" | "dir:down" | "dir:left" | "dir:right" | "plain" | "plain:up" | "plain:down" | "plain:left" | "plain:right" | "shown" | "hidden" | "destroyed",
      callback: (evt: Event, data: JoystickEventData) => void
    ): void;
    off(event: string, callback?: (...args: unknown[]) => void): void;
    destroy(): void;
    get(id: number): unknown;
  }

  function create(options: JoystickManagerOptions): JoystickManager;
}
