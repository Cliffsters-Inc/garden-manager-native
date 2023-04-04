import DateTimePickerModal from "react-native-modal-datetime-picker";

import { View } from "../../components/Themed";

interface Props {
  showDatePicker: boolean;
  setShowDatePicker: React.Dispatch<React.SetStateAction<boolean>>;
  createDateRange: (date: Date) => void;
}

export const DatePicker = ({
  showDatePicker,
  setShowDatePicker,
  createDateRange,
}: Props) => {
  const handleConfirm = (date: Date) => {
    createDateRange(date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setShowDatePicker(false);
  };

  return (
    <View>
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
