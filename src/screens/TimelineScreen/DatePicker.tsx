import DateTimePickerModal from "react-native-modal-datetime-picker";

import { View } from "../../components/Themed";

interface Props {
  isDatePickerVisible: boolean;
  setDatePickerVisibility: React.Dispatch<React.SetStateAction<boolean>>;
  createDateRange: (date: Date) => void;
}

export const DatePicker = ({
  isDatePickerVisible,
  setDatePickerVisibility,
  createDateRange,
}: Props) => {
  const handleConfirm = (date: Date) => {
    createDateRange(date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  return (
    <View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
