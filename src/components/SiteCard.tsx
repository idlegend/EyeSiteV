// src/components/SiteCard.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Site } from '../types';
import { COLORS, SIZES } from '../constants/theme';
import { Card } from './Card';

interface SiteCardProps {
  site: Site;
  onPress: () => void;
}

export const SiteCard: React.FC<SiteCardProps> = ({ site, onPress }) => {
  const getStatusColor = (status: Site['status']) => {
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

  const getStatusIcon = (status: Site['status']) => {
    switch (status) {
      case 'online':
        return 'checkmark-circle';
      case 'offline':
        return 'close-circle';
      case 'warning':
        return 'warning';
      case 'maintenance':
        return 'construct';
      default:
        return 'help-circle';
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.name}>{site.name}</Text>
            <View style={styles.statusContainer}>
              <Ionicons
                name={getStatusIcon(site.status) as any}
                size={16}
                color={getStatusColor(site.status)}
              />
              <Text style={[styles.status, { color: getStatusColor(site.status) }]}>
                {site.status.toUpperCase()}
              </Text>
            </View>
          </View>
          {site.alerts > 0 && (
            <View style={styles.alertBadge}>
              <Text style={styles.alertText}>{site.alerts}</Text>
            </View>
          )}
        </View>

        <View style={styles.locationContainer}>
          <Ionicons name="location-outline" size={14} color={COLORS.textSecondary} />
          <Text style={styles.location}>{site.location}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.metricsContainer}>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Power Output</Text>
            <Text style={styles.metricValue}>{site.powerOutput} kW</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Efficiency</Text>
            <Text style={styles.metricValue}>{site.efficiency}%</Text>
          </View>
        </View>

        <Text style={styles.lastUpdated}>
          Last updated: {new Date(site.lastUpdated).toLocaleTimeString()}
        </Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
  },
  name: {
    fontSize: SIZES.h5,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  status: {
    fontSize: SIZES.caption,
    fontWeight: '600',
  },
  alertBadge: {
    backgroundColor: COLORS.error,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertText: {
    color: COLORS.textLight,
    fontSize: SIZES.caption,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  location: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 12,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  metric: {
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: SIZES.h5,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  lastUpdated: {
    fontSize: SIZES.small,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});