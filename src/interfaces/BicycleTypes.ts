import type { ReactNode } from 'react';

export type TimeoutRef = ReturnType<typeof setTimeout> | null;

export interface BicycleAnimationProps {
  interactiveMode: string;
  repairModeParts?: Array<{name: string, color: string}>;
}

export interface BicycleAnimationRef {
  updateBikePosition: (moveX: number, moveY: number) => void;
}

export interface BicyclePart {
  id: string;
  name: string;
  options: Array<{
    id: string;
    name: string;
    color: string;
    icon: ReactNode;
  }>;
}

export interface ModePropTypes {
  selectedColor: string;
  setSelectedColor?: (color: string) => void;
}

export interface SpeedModeProps extends ModePropTypes {
  wheelAnimationControls: any;
  bicycleControls: any;
  startWheelSpin: () => void;
  startGearsAnimation: () => void;
}

export interface CustomizeModeProps extends ModePropTypes {
  customizeControls: any;
  bicycleControls: any;
  activePart: string;
  setActivePart: (part: string) => void;
  selectedParts: Record<string, string>;
  setSelectedParts: (parts: Record<string, string>) => void;
  getCurrentPartOption: (partId: string) => any;
  changePart: (partId: string, direction: 'next' | 'prev') => void;
}

export interface RepairModeProps extends ModePropTypes {
  bicycleControls: any;
  repairModeParts: Array<{name: string, color: string}>;
  hoverPart: number | null;
  setHoverPart: (part: number | null) => void;
} 