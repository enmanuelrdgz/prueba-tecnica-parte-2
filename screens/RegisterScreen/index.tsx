import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

const RegisterScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  // Animaciones
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const fullNameScaleAnim = useRef(new Animated.Value(1)).current;
  const emailScaleAnim = useRef(new Animated.Value(1)).current;
  const usernameScaleAnim = useRef(new Animated.Value(1)).current;
  const passwordScaleAnim = useRef(new Animated.Value(1)).current;
  const confirmPasswordScaleAnim = useRef(new Animated.Value(1)).current;
  const buttonScaleAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación inicial
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleRegister = async () => {
    setErrorMessage('');

    if (!fullName.trim() || !email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage('Por favor, completa todos los campos');
      shakeAnimation();
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      shakeAnimation();
      return;
    }

    if (password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres');
      shakeAnimation();
      return;
    }

    setIsLoading(true);
    buttonPressAnimation();

    // Simular llamada a servicio
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleGoToLogin = () => {
    setErrorMessage('');
    navigation.navigate('Login');
  };

  const getScaleAnim = (inputName: string) => {
    switch (inputName) {
      case 'fullName':
        return fullNameScaleAnim;
      case 'email':
        return emailScaleAnim;
      case 'username':
        return usernameScaleAnim;
      case 'password':
        return passwordScaleAnim;
      case 'confirmPassword':
        return confirmPasswordScaleAnim;
      default:
        return fullNameScaleAnim;
    }
  };

  const handleInputFocus = (inputName: string) => {
    setFocusedInput(inputName);
    const scaleAnim = getScaleAnim(inputName);
    
    Animated.spring(scaleAnim, {
      toValue: 1.05,
      useNativeDriver: true,
    }).start();
  };

  const handleInputBlur = (inputName: string) => {
    setFocusedInput(null);
    const scaleAnim = getScaleAnim(inputName);
    
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const buttonPressAnimation = () => {
    Animated.sequence([
      Animated.timing(buttonScaleAnim, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const shakeAnimation = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  const getInputIcon = (inputName: string) => {
    const iconColor = focusedInput === inputName ? '#8b5cf6' : '#9ca3af';
    
    switch (inputName) {
      case 'fullName':
        return <Ionicons name="person-circle-outline" size={20} color={iconColor} />;
      case 'email':
        return <Ionicons name="mail-outline" size={20} color={iconColor} />;
      case 'username':
        return <Ionicons name="person-outline" size={20} color={iconColor} />;
      case 'password':
      case 'confirmPassword':
        return <Ionicons name="lock-closed-outline" size={20} color={iconColor} />;
      default:
        return <Ionicons name="person-outline" size={20} color={iconColor} />;
    }
  };

  const renderInputField = (
    inputName: string,
    label: string,
    placeholder: string,
    value: string,
    onChangeText: (text: string) => void,
    secureTextEntry = false,
    keyboardType: any = 'default',
    autoCapitalize: any = 'none'
  ) => {
    const scaleAnim = getScaleAnim(inputName);
    
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <Animated.View
          style={[
            styles.inputWrapper,
            {
              transform: [{ scale: scaleAnim }],
              shadowOpacity: focusedInput === inputName ? 0.3 : 0.1,
            },
          ]}
        >
          <View style={styles.inputIconContainer}>
            {getInputIcon(inputName)}
          </View>
          <TextInput
            style={[
              styles.textInput,
              {
                borderColor: focusedInput === inputName ? '#8b5cf6' : '#e5e7eb',
              },
            ]}
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
            value={value}
            onChangeText={(text) => {
              onChangeText(text);
              if (errorMessage) setErrorMessage('');
            }}
            onFocus={() => handleInputFocus(inputName)}
            onBlur={() => handleInputBlur(inputName)}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoCorrect={false}
          />
        </Animated.View>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={['#f3e8ff', '#e9d5ff', '#ddd6fe']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: fadeAnim,
                transform: [{ translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-10, 0],
                }) }],
              },
            ]}
          >
            <Text style={styles.title}>Crear Cuenta</Text>
            <Text style={styles.subtitle}>Completa tus datos para registrarte</Text>
          </Animated.View>

          {/* Form */}
          <Animated.View
            style={[
              styles.formContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }],
              },
            ]}
          >
            {/* Full Name Input */}
            {renderInputField(
              'fullName',
              'Nombre Completo',
              'Ingresa tu nombre completo',
              fullName,
              setFullName,
              false,
              'default',
              'words'
            )}

            {/* Email Input */}
            {renderInputField(
              'email',
              'Correo Electrónico',
              'Ingresa tu correo electrónico',
              email,
              setEmail,
              false,
              'email-address',
              'none'
            )}

            {/* Username Input */}
            {renderInputField(
              'username',
              'Usuario',
              'Elige un nombre de usuario',
              username,
              setUsername
            )}

            {/* Password Input */}
            {renderInputField(
              'password',
              'Contraseña',
              'Crea una contraseña segura',
              password,
              setPassword,
              true
            )}

            {/* Confirm Password Input */}
            {renderInputField(
              'confirmPassword',
              'Confirmar Contraseña',
              'Confirma tu contraseña',
              confirmPassword,
              setConfirmPassword,
              true
            )}

            {/* Error Message */}
            {errorMessage ? (
              <Animated.View
                style={[
                  styles.errorContainer,
                  { transform: [{ translateX: shakeAnim }] },
                ]}
              >
                <Text style={styles.errorText}>{errorMessage}</Text>
              </Animated.View>
            ) : null}

            {/* Register Button */}
            <Animated.View style={{ transform: [{ scale: buttonScaleAnim }] }}>
              <TouchableOpacity
                style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                onPress={handleRegister}
                disabled={isLoading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#8b5cf6', '#a855f7', '#9333ea']}
                  style={styles.registerButtonGradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  {isLoading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator color="#fff" size="small" />
                      <Text style={styles.loadingText}>Creando cuenta...</Text>
                    </View>
                  ) : (
                    <Text style={styles.registerButtonText}>Crear Cuenta</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </Animated.View>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={handleGoToLogin}
              activeOpacity={0.7}
            >
              <Text style={styles.loginButtonText}>
                ¿Ya tienes cuenta? Inicia Sesión
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default RegisterScreen;