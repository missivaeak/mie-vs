import { useCallback, useState } from 'react'
import { Text, View, Modal, StyleSheet, Pressable } from "react-native"
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ModalDefault({children, setModalOpen}: {
  children: React.ReactNode,
  setModalOpen: (modalOpen: boolean) => void
}) {
  const closeModal = useCallback(() => {
    setModalOpen(false)
  }, [])

  return (
    <Modal
      style={styles.container}
      animationType='slide'
      transparent={true}
      visible={true}
      >
        <View
          style={styles.modal}
          >
            {children}
            <Pressable
              style={styles.closeButton}
              onPress={closeModal}
              >
              <MaterialCommunityIcon
                style={{
                  color: '#000000'
                }}
                name="close-circle"
                size={40}
                />
            </Pressable>
        </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  modal: {
    // ...StyleSheet.absoluteFillObject,
    backgroundColor: '#ffffffee',
    marginHorizontal: 50,
    marginVertical: 100,
    borderRadius: 10,
    padding: 15,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeButton: {
    position: "absolute",
    top: 0,
    right: 0,
    transform: [
      { translateX: 10 },
      { translateY: -10 }
    ]
  }
})
