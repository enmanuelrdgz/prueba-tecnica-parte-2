import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';

const { width } = Dimensions.get('window');

const AdminProfileScreen = ({ navigation }: any) => {
  const { logout } = useAuth();

  // Admin user data
  const [admin] = useState({
    name: 'Admin User',
    email: 'admin@ecommerce.com',
    role: 'Store Administrator',
    adminSince: '2022',
    avatar: 'https://via.placeholder.com/120/8b5cf6/FFFFFF?text=AD',
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

  // Admin menu items
  const adminMenuItems = [
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

  const renderMenuItem = (item: any, index: number) => (
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
            <Text style={styles.headerTitle}>Admin Profile</Text>
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
              {adminMenuItems.map((item, index) => renderMenuItem(item, index))}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerGradient: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  scrollView: {
    flex: 1,
  },
  userSection: {
    margin: 16,
    borderRadius: 20,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  userSectionGradient: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderRadius: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f3f4f6',
    borderWidth: 3,
    borderColor: '#8b5cf6',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 3,
    borderColor: '#fff',
    overflow: 'hidden',
  },
  editAvatarGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'center',
  },
  adminName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  adminRole: {
    fontSize: 16,
    fontWeight: '600',
    color: '#8b5cf6',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 2,
  },
  memberSince: {
    fontSize: 14,
    color: '#9ca3af',
  },
  statsSection: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  statsSectionGradient: {
    flexDirection: 'row',
    paddingVertical: 20,
    borderRadius: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 10,
  },
  menuSection: {
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  menuSectionGradient: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f9fafb',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
  },
  menuItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  logoutSection: {
    marginHorizontal: 16,
    marginBottom: 20,
  },
  logoutButton: {
    borderRadius: 12,
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fecaca',
    paddingVertical: 12,
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#dc2626',
    marginLeft: 8,
  },
});

export default AdminProfileScreen;