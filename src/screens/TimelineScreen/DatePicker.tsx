import DateTimePickerModal from "react-native-modal-datetime-picker";

import { View } from "../../components/Themed";

interface Props {
  showPicker: boolean;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
  createDateRange: (date: Date) => void;
}

export const DatePicker = ({
  showPicker,
  setShowPicker,
  createDateRange,
}: Props) => {
  const handleConfirm = (date: Date) => {
    createDateRange(date);
    hideDatePicker();
  };

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  return (
    <View>
      <DateTimePickerModal
        isVisible={showPicker}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};
