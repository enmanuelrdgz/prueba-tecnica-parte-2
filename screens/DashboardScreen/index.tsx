import { View, Text, ScrollView, StyleSheet, SafeAreaView, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"

const { width } = Dimensions.get("window")

const DashboardScreen = () => {
  // Mock statistics data - no logic, just static display
  const stats = {
    totalSales: 45280,
    totalOrders: 1247,
    totalProducts: 156,
    totalCustomers: 892,
    monthlyGrowth: 12.5,
    pendingOrders: 23,
    lowStockItems: 8,
    newCustomers: 34,
  }

  const recentOrders = [
    { id: "#3102", customer: "Sophia Anderson", amount: 150.0, status: "Completed" },
    { id: "#3101", customer: "Michael Chen", amount: 89.99, status: "Processing" },
    { id: "#3100", customer: "Emma Wilson", amount: 245.5, status: "Shipped" },
    { id: "#3099", customer: "James Rodriguez", amount: 67.25, status: "Pending" },
  ]

  const topProducts = [
    { name: "Wireless Headphones", sales: 234, revenue: 20826 },
    { name: "Smart Watch", sales: 189, revenue: 37611 },
    { name: "Smartphone Pro", sales: 156, revenue: 46644 },
    { name: "Laptop Stand", sales: 98, revenue: 4900 },
  ]

  const formatPrice = (price: number) => {
    return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "#28a745"
      case "Processing":
        return "#ffc107"
      case "Shipped":
        return "#007bff"
      case "Pending":
        return "#6c757d"
      default:
        return "#6c757d"
    }
  }

  const StatCard = ({ title, value, icon, color, subtitle }: any) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statCardContent}>
        <View style={styles.statCardLeft}>
          <Text style={styles.statCardTitle}>{title}</Text>
          <Text style={styles.statCardValue}>{value}</Text>
          {subtitle && <Text style={styles.statCardSubtitle}>{subtitle}</Text>}
        </View>
        <View style={[styles.statCardIcon, { backgroundColor: color + "20" }]}>
          <Ionicons name={icon} size={24} color={color} />
        </View>
      </View>
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.headerSubtitle}>Welcome back, Admin</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Main Stats Grid */}
        <View style={styles.statsGrid}>
          <StatCard
            title="Total Sales"
            value={formatPrice(stats.totalSales)}
            icon="trending-up"
            color="#28a745"
            subtitle={`+${stats.monthlyGrowth}% this month`}
          />
          <StatCard title="Total Orders" value={stats.totalOrders.toLocaleString()} icon="receipt" color="#007bff" />
          <StatCard title="Products" value={stats.totalProducts} icon="cube" color="#6f42c1" />
          <StatCard title="Customers" value={stats.totalCustomers.toLocaleString()} icon="people" color="#fd7e14" />
        </View>

        {/* Quick Stats Row */}
        <View style={styles.quickStatsRow}>
          <View style={styles.quickStatItem}>
            <View style={styles.quickStatIcon}>
              <Ionicons name="time" size={20} color="#ffc107" />
            </View>
            <Text style={styles.quickStatNumber}>{stats.pendingOrders}</Text>
            <Text style={styles.quickStatLabel}>Pending Orders</Text>
          </View>

          <View style={styles.quickStatItem}>
            <View style={styles.quickStatIcon}>
              <Ionicons name="warning" size={20} color="#dc3545" />
            </View>
            <Text style={styles.quickStatNumber}>{stats.lowStockItems}</Text>
            <Text style={styles.quickStatLabel}>Low Stock</Text>
          </View>

          <View style={styles.quickStatItem}>
            <View style={styles.quickStatIcon}>
              <Ionicons name="person-add" size={20} color="#20c997" />
            </View>
            <Text style={styles.quickStatNumber}>{stats.newCustomers}</Text>
            <Text style={styles.quickStatLabel}>New Customers</Text>
          </View>
        </View>

        {/* Recent Orders Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <Text style={styles.sectionSubtitle}>Latest customer orders</Text>
          </View>

          <View style={styles.ordersContainer}>
            {recentOrders.map((order) => (
              <View key={order.id} style={styles.orderItem}>
                <View style={styles.orderLeft}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderCustomer}>{order.customer}</Text>
                </View>
                <View style={styles.orderRight}>
                  <Text style={styles.orderAmount}>{formatPrice(order.amount)}</Text>
                  <View style={[styles.orderStatus, { backgroundColor: getStatusColor(order.status) + "20" }]}>
                    <Text style={[styles.orderStatusText, { color: getStatusColor(order.status) }]}>
                      {order.status}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Top Products Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Products</Text>
            <Text style={styles.sectionSubtitle}>Best performing products</Text>
          </View>

          <View style={styles.productsContainer}>
            {topProducts.map((product, index) => (
              <View key={product.name} style={styles.productItem}>
                <View style={styles.productRank}>
                  <Text style={styles.productRankText}>{index + 1}</Text>
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{product.name}</Text>
                  <Text style={styles.productStats}>
                    {product.sales} sales • {formatPrice(product.revenue)}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#6c757d",
  },
  scrollView: {
    flex: 1,
  },
  statsGrid: {
    padding: 16,
    gap: 12,
  },
  statCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  statCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statCardLeft: {
    flex: 1,
  },
  statCardTitle: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 4,
  },
  statCardValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 2,
  },
  statCardSubtitle: {
    fontSize: 12,
    color: "#28a745",
    fontWeight: "500",
  },
  statCardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  quickStatsRow: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  quickStatItem: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  quickStatIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  quickStatNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#212529",
    marginBottom: 4,
  },
  quickStatLabel: {
    fontSize: 12,
    color: "#6c757d",
    textAlign: "center",
  },
  section: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f9fa",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 2,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6c757d",
  },
  ordersContainer: {
    padding: 16,
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f9fa",
  },
  orderLeft: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 2,
  },
  orderCustomer: {
    fontSize: 14,
    color: "#6c757d",
  },
  orderRight: {
    alignItems: "flex-end",
  },
  orderAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 4,
  },
  orderStatus: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  orderStatusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  productsContainer: {
    padding: 16,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f8f9fa",
  },
  productRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  productRankText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 2,
  },
  productStats: {
    fontSize: 14,
    color: "#6c757d",
  },
})

export default DashboardScreen
