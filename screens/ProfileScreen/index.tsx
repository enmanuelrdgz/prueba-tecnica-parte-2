// AdminProfileScreen.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { styles } from './styles';

const AdminProfileScreen = () => {
  const { logout } = useAuth();

  // Mock user data
  const [admin] = useState({
    name: 'Admin User',
    email: 'admin@ecommerce.com',
    role: 'Store Administrator',
    adminSince: '2022',
    avatar: 'https://i.pravatar.cc/250?u=usuario@example.com',
  });

  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out of your admin account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: () => {
            logout();
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      id: 1,
      title: 'Product Management',
      icon: 'cube-outline',
      description: 'Add, edit, and manage products',
      color: '#8b5cf6',
      onPress: () => Alert.alert('Feature', 'Product Management screen would open here'),
    },
    {
      id: 2,
      title: 'Order Management',
      icon: 'receipt-outline',
      description: 'View and process customer orders',
      color: '#3b82f6',
      onPress: () => Alert.alert('Feature', 'Order Management screen would open here'),
    },
    {
      id: 3,
      title: 'Customer Management',
      icon: 'people-outline',
      description: 'Manage customer accounts',
      color: '#10b981',
      onPress: () => Alert.alert('Feature', 'Customer Management screen would open here'),
    },
    {
      id: 4,
      title: 'Analytics & Reports',
      icon: 'analytics-outline',
      description: 'View sales analytics and reports',
      color: '#f59e0b',
      onPress: () => Alert.alert('Feature', 'Analytics & Reports screen would open here'),
    },
    {
      id: 5,
      title: 'Inventory Management',
      icon: 'library-outline',
      description: 'Track and manage inventory',
      color: '#ef4444',
      onPress: () => Alert.alert('Feature', 'Inventory Management screen would open here'),
    },
    {
      id: 6,
      title: 'Store Settings',
      icon: 'settings-outline',
      description: 'Configure store preferences',
      color: '#6b7280',
      onPress: () => Alert.alert('Feature', 'Store Settings screen would open here'),
    },
    {
      id: 7,
      title: 'Promotions & Discounts',
      icon: 'pricetag-outline',
      description: 'Manage coupons and promotions',
      color: '#ec4899',
      onPress: () => Alert.alert('Feature', 'Promotions & Discounts screen would open here'),
    },
    {
      id: 8,
      title: 'Admin Support',
      icon: 'help-circle-outline',
      description: 'Get admin help and documentation',
      color: '#14b8a6',
      onPress: () => Alert.alert('Feature', 'Admin Support screen would open here'),
    },
  ];

  const renderMenuItem = (item: any) => (
    <View key={item.id}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={item.onPress}
        activeOpacity={0.7}
      >
        <View style={styles.menuItemLeft}>
          <LinearGradient
            colors={[item.color + '20', item.color + '10']}
            style={styles.menuItemIconContainer}
          >
            <Ionicons name={item.icon} size={22} color={item.color} />
          </LinearGradient>
          <View style={styles.menuItemText}>
            <Text style={styles.menuItemTitle}>{item.title}</Text>
            <Text style={styles.menuItemDescription}>{item.description}</Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
      </TouchableOpacity>
    </View>
  );

  const StatItem = ({ number, label }: any) => (
    <View style={styles.statItem}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <LinearGradient colors={['#f3e8ff', '#e9d5ff', '#ddd6fe']} style={styles.container}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <LinearGradient colors={['#ffffff', '#faf5ff']} style={styles.headerGradient}>
            <Text style={styles.headerTitle}>Profile</Text>
          </LinearGradient>
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Admin Info Section */}
          <View style={styles.userSection}>
            <LinearGradient colors={['#ffffff', '#fefbff']} style={styles.userSectionGradient}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: admin.avatar }} style={styles.avatar} resizeMode="cover" />
                <TouchableOpacity
                  style={styles.editAvatarButton}
                  onPress={() => Alert.alert('Feature', 'Avatar editing would be available here')}
                >
                  <LinearGradient colors={['#8b5cf6', '#a855f7']} style={styles.editAvatarGradient}>
                    <Ionicons name="camera" size={16} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              </View>

              <View style={styles.userInfo}>
                <Text style={styles.adminName}>{admin.name}</Text>
                <Text style={styles.adminRole}>{admin.role}</Text>
                <Text style={styles.email}>{admin.email}</Text>
                <Text style={styles.memberSince}>Admin since {admin.adminSince}</Text>
              </View>
            </LinearGradient>
          </View>

          {/* Admin Stats Section */}
          <View style={styles.statsSection}>
            <LinearGradient colors={['#ffffff', '#fefbff']} style={styles.statsSectionGradient}>
              <StatItem number="1,247" label="Total Products" />
              <View style={styles.statDivider} />
              <StatItem number="$45,280" label="Monthly Sales" />
              <View style={styles.statDivider} />
              <StatItem number="892" label="Active Users" />
            </LinearGradient>
          </View>

          {/* Admin Menu Items Section */}
          <View style={styles.menuSection}>
            <LinearGradient colors={['#ffffff', '#fefbff']} style={styles.menuSectionGradient}>
              {menuItems.map((item) => renderMenuItem(item))}
            </LinearGradient>
          </View>

          {/* Logout Button */}
          <View style={styles.logoutSection}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
              <LinearGradient colors={['#fef2f2', '#fee2e2']} style={styles.logoutButtonGradient}>
                <Ionicons name="log-out-outline" size={20} color="#dc2626" />
                <Text style={styles.logoutText}>Sign Out</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default AdminProfileScreen;
