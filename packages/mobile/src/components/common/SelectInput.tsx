import React from "react";
import { StyleSheet } from "react-native";
import RNPickerSelect, { PickerSelectProps } from "react-native-picker-select";

type SelectInputProps = PickerSelectProps;

/**
 * A component that displays a select input. On iOS it uses a picker and on Android it uses a dialog.
 */
export default function SelectInput(props: SelectInputProps) {
  return <RNPickerSelect {...props} style={pickerSelectStyles} />;
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    marginBottom: 15,
  },
  inputIOSContainer: {
    pointerEvents: "none",
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
    marginBottom: 15,
  },
});
