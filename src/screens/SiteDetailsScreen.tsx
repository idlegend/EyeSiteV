// src/screens/SiteDetailsScreen.tsx

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { COLORS, SIZES, SHADOWS } from '../constants/theme';
import { mockSites, mockAssets } from '../services/mockData';

type SiteDetailsNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SiteDetails'
>;
type SiteDetailsRouteProp = RouteProp<RootStackParamList, 'SiteDetails'>;

interface Props {
  navigation: SiteDetailsNavigationProp;
  route: SiteDetailsRouteProp;
}

const { width } = Dimensions.get('window');

export const SiteDetailsScreen: React.FC<Props> = ({ navigation, route }) => {
  const { siteId } = route.params;
  const site = mockSites.find((s) => s.id === siteId);
  const siteAssets = mockAssets.filter((a) => a.siteId === siteId);

  if (!site) {
    return (
      <View style={styles.container}>
        <Text>Site not found</Text>
      </View>
    );
  }

  const getStatusColor = (status: typeof site.status) => {
    switch (status) {
      case 'online':
        return COLORS.online;
      case 'offline':
        return COLORS.offline;
      case 'warning':
        return COLORS.warningStatus;
      case 'maintenance':
        return COLORS.maintenance;
      default:
        return COLORS.disabled;
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Site Details</Text>
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-vertical" size={24} color={COLORS.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Site Info Card */}
        <Card style={styles.infoCard}>
          <View style={styles.siteHeader}>
            <View style={styles.siteInfo}>
              <Text style={styles.siteName}>{site.name}</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location" size={16} color={COLORS.textSecondary} />
                <Text style={styles.location}>{site.location}</Text>
              </View>
            </View>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(site.status) },
              ]}
            >
              <Text style={styles.statusText}>{site.status.toUpperCase()}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.metricsGrid}>
            <View style={styles.metricItem}>
              <Ionicons name="flash" size={24} color={COLORS.primary} />
              <Text style={styles.metricValue}>{site.powerOutput} kW</Text>
              <Text style={styles.metricLabel}>Power Output</Text>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="speedometer" size={24} color={COLORS.success} />
              <Text style={styles.metricValue}>{site.efficiency}%</Text>
              <Text style={styles.metricLabel}>Efficiency</Text>
            </View>
            <View style={styles.metricItem}>
              <Ionicons name="warning" size={24} color={COLORS.warning} />
              <Text style={styles.metricValue}>{site.alerts}</Text>
              <Text style={styles.metricLabel}>Alerts</Text>
            </View>
          </View>

          <Text style={styles.lastUpdated}>
            Last updated: {new Date(site.lastUpdated).toLocaleString()}
          </Text>
        </Card>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <Button
              title="Create Ticket"
              onPress={() => navigation.navigate('CreateTicket', { siteId: site.id })}
              variant="primary"
              style={styles.actionButton}
            />
            <Button
              title="View Map"
              onPress={() => {}}
              variant="outline"
              style={styles.actionButton}
            />
          </View>
        </View>

        {/* Assets */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Assets ({siteAssets.length})</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          {siteAssets.map((asset) => (
            <TouchableOpacity
              key={asset.id}
              onPress={() => navigation.navigate('AssetDetails', { assetId: asset.id })}
            >
              <Card style={styles.assetCard}>
                <View style={styles.assetHeader}>
                  <View style={styles.assetInfo}>
                    <Text style={styles.assetName}>{asset.name}</Text>
                    <Text style={styles.assetType}>{asset.type}</Text>
                  </View>
                  <View
                    style={[
                      styles.assetStatus,
                      {
                        backgroundColor:
                          asset.status === 'operational'
                            ? COLORS.success + '20'
                            : asset.status === 'maintenance'
                            ? COLORS.warning + '20'
                            : COLORS.offline + '20',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.assetStatusText,
                        {
                          color:
                            asset.status === 'operational'
                              ? COLORS.success
                              : asset.status === 'maintenance'
                              ? COLORS.warning
                              : COLORS.offline,
                        },
                      ]}
                    >
                      {asset.status.toUpperCase()}
                    </Text>
                  </View>
                </View>
                <View style={styles.assetFooter}>
                  <Text style={styles.assetMaintenance}>
                    Next: {asset.nextMaintenance}
                  </Text>
                  <Ionicons
                    name="chevron-forward"
                    size={20}
                    color={COLORS.textSecondary}
                  />
                </View>
              </Card>
            </TouchableOpacity>
          ))}
          {siteAssets.length === 0 && (
            <Card style={styles.emptyCard}>
              <Text style={styles.emptyText}>No assets found</Text>
            </Card>
          )}
        </View>

        {/* Site Coordinates */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location Coordinates</Text>
          <Card>
            <View style={styles.coordinateRow}>
              <Text style={styles.coordinateLabel}>Latitude:</Text>
              <Text style={styles.coordinateValue}>
                {site.coordinates.latitude}
              </Text>
            </View>
            <View style={styles.coordinateRow}>
              <Text style={styles.coordinateLabel}>Longitude:</Text>
              <Text style={styles.coordinateValue}>
                {site.coordinates.longitude}
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: COLORS.surface,
    ...SHADOWS.small,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: SIZES.h5,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  moreButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  infoCard: {
    marginBottom: 16,
  },
  siteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  siteInfo: {
    flex: 1,
  },
  siteName: {
    fontSize: SIZES.h4,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: COLORS.textLight,
    fontSize: SIZES.caption,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 16,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  metricItem: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: SIZES.h5,
    fontWeight: 'bold',
    color: COLORS.text,
    marginTop: 8,
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  lastUpdated: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: SIZES.h6,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  seeAll: {
    fontSize: SIZES.body,
    color: COLORS.primary,
    fontWeight: '600',
  },
  actionsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  assetCard: {
    marginBottom: 12,
  },
  assetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  assetInfo: {
    flex: 1,
  },
  assetName: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 2,
  },
  assetType: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  assetStatus: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  assetStatusText: {
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  assetFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assetMaintenance: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  coordinateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  coordinateLabel: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
  },
  coordinateValue: {
    fontSize: SIZES.body,
    fontWeight: '600',
    color: COLORS.text,
  },
});