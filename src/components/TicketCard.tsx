// src/components/TicketCard.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Ticket } from '../types';
import { COLORS, SIZES } from '../constants/theme';
import { Card } from './Card';

interface TicketCardProps {
  ticket: Ticket;
  onPress: () => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({ ticket, onPress }) => {
  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'critical':
        return COLORS.error;
      case 'high':
        return COLORS.warning;
      case 'medium':
        return COLORS.info;
      case 'low':
        return COLORS.success;
      default:
        return COLORS.disabled;
    }
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return COLORS.error;
      case 'in-progress':
        return COLORS.warning;
      case 'resolved':
        return COLORS.success;
      case 'closed':
        return COLORS.disabled;
      default:
        return COLORS.disabled;
    }
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {ticket.title}
            </Text>
            <Text style={styles.siteName}>{ticket.siteName}</Text>
          </View>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(ticket.priority) },
            ]}
          >
            <Text style={styles.priorityText}>{ticket.priority.toUpperCase()}</Text>
          </View>
        </View>

        <Text style={styles.description} numberOfLines={2}>
          {ticket.description}
        </Text>

        <View style={styles.footer}>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(ticket.status) + '20' },
            ]}
          >
            <Text style={[styles.statusText, { color: getStatusColor(ticket.status) }]}>
              {ticket.status.replace('-', ' ').toUpperCase()}
            </Text>
          </View>
          <Text style={styles.date}>
            {new Date(ticket.createdAt).toLocaleDateString()}
          </Text>
        </View>
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
    marginRight: 8,
  },
  title: {
    fontSize: SIZES.h6,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 4,
  },
  siteName: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  priorityText: {
    color: COLORS.textLight,
    fontSize: SIZES.small,
    fontWeight: 'bold',
  },
  description: {
    fontSize: SIZES.body,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: SIZES.caption,
    fontWeight: '600',
  },
  date: {
    fontSize: SIZES.caption,
    color: COLORS.textSecondary,
  },
});