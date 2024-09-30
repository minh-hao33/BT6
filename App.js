import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Validate the phone number and format it with spaces every 3 digits
  const formatPhoneNumber = (input) => {
    const formatted = input.replace(/\D/g, ''); // Remove non-numeric characters
    return formatted
      .replace(/(\d{3})(\d{3})(\d{0,4})/, '$1 $2 $3')
      .trim(); // Add spaces after 3rd and 6th digits
  };

  const handlePhoneNumberChange = (input) => {
    const formatted = formatPhoneNumber(input);
    setPhoneNumber(formatted);
  };

  // Validate when clicking "Tiếp tục"
  const handleContinue = () => {
    const isValid = phoneNumber.replace(/\s+/g, '').length === 10; // Ignore spaces in length check
    if (!isValid) {
      setErrorMessage('Số điện thoại phải có 10 chữ số.');
    } else {
      setErrorMessage(''); // Reset error message if valid
      // Continue to the next step (e.g., send OTP)
      console.log('Phone number is valid, proceed...');
    }
  };

  // Check if phone number is valid for button enabling
  const isValidPhoneNumber = phoneNumber.replace(/\s+/g, '').length === 10;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header với tiêu đề "Đăng nhập" */}
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Đăng nhập</Text>
      </View>

      {/* Container cho phần đăng nhập */}
      <View style={styles.loginContainer}>
        <Text style={styles.subtitle}>
          Nhập số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>

        {/* Ô nhập số điện thoại */}
        <TextInput
          style={[styles.input, errorMessage ? styles.inputError : null]}
          onChangeText={handlePhoneNumberChange}
          value={phoneNumber}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="numeric"
          maxLength={13} // Allow for spaces (10 digits + 2 spaces)
        />

        {/* Hiển thị lỗi nếu số điện thoại không hợp lệ */}
        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        {/* Nút "Tiếp tục" */}
        <TouchableOpacity
          style={[
            styles.button,
            {backgroundColor: isValidPhoneNumber ? '#34C759' : '#E0E0E0'}, // Thay đổi màu nút
          ]}
          disabled={!isValidPhoneNumber} // Vô hiệu hóa khi số điện thoại không hợp lệ
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Tiếp tục</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, // Tạo đổ bóng cho phần header
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 5,
  },
  loginContainer: {
    paddingHorizontal: 20,
    marginTop: 40,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
