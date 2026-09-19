import { FaBicycle, FaCircle, FaCog } from 'react-icons/fa';
import type { BicyclePart } from '../../interfaces/BicycleTypes';

export const bicycleParts: BicyclePart[] = [
  {
    id: 'frame',
    name: 'Frame',
    options: [
      { id: 'standard', name: 'Standard', color: '#f97316', icon: <FaBicycle /> },
      { id: 'racing', name: 'Racing', color: '#ef4444', icon: <FaBicycle /> },
      { id: 'mountain', name: 'Mountain', color: '#3b82f6', icon: <FaBicycle /> },
    ]
  },
  {
    id: 'wheels',
    name: 'Wheels',
    options: [
      { id: 'regular', name: 'Regular', color: '#f97316', icon: <FaCircle /> },
      { id: 'slim', name: 'Slim', color: '#3b82f6', icon: <FaCircle /> },
      { id: 'wide', name: 'Wide', color: '#10b981', icon: <FaCircle /> },
    ]
  },
  {
    id: 'drivetrain',
    name: 'Drivetrain',
    options: [
      { id: 'standard', name: 'Standard', color: '#f97316', icon: <FaCog /> },
      { id: 'performance', name: 'Performance', color: '#8b5cf6', icon: <FaCog /> },
      { id: 'racing', name: 'Racing', color: '#ef4444', icon: <FaCog /> },
    ]
  },
];

export const getDefaultSelectedParts = (): Record<string, string> => ({
  frame: 'standard',
  wheels: 'regular',
  drivetrain: 'standard',
});

export const getPartOption = (
  partId: string, 
  optionId: string, 
  parts = bicycleParts
): any => {
  const part = parts.find(p => p.id === partId);
  if (!part) return null;
  
  return part.options.find(opt => opt.id === optionId) || part.options[0];
};

export const getCurrentPartOption = (
  partId: string, 
  selectedParts: Record<string, string>
): any => {
  const selectedOptionId = selectedParts[partId];
  return getPartOption(partId, selectedOptionId);
}; 
