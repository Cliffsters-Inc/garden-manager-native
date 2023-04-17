import { SwitchSelector } from "../FilterModal/SwitchSelector";

export const ResetFilters: React.FC<{
  clearFilters: () => void;
  activeFilter: boolean;
}> = ({ clearFilters, activeFilter }) => (
  <SwitchSelector
    name="None"
    handlePress={clearFilters}
    tickCondition={activeFilter}
  />
);
