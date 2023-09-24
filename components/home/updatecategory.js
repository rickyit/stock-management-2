import { StyleSheet, Text, View, Modal } from "react-native";

export default function UpdateCategory({ isVisible, children, onClose }) {
  return (
    <Modal animationType="slide" transparent="true" visible={isVisible}>
      <View style={styles.container}>
        <Text>Test</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "25%",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
});
