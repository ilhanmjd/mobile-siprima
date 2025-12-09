import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Screen from '../../components/Screen';
import SectionCard from '../../components/SectionCard';
import { colors, spacing } from '../../theme';
import { faqItems } from '../../data/mockData';

const FaqScreen = () => {
  const [expanded, setExpanded] = useState('faq-1');

  return (
    <Screen>
      <SectionCard title="Frequently Asked Questions">
        {faqItems.map(item => {
          const isOpen = expanded === item.id;
          return (
            <View key={item.id} style={[styles.item, isOpen && styles.itemActive]}>
              <TouchableOpacity
                onPress={() => setExpanded(isOpen ? null : item.id)}
                style={styles.questionRow}
              >
                <Text style={[styles.question, isOpen && styles.questionActive]}>{item.question}</Text>
                <AntDesign
                  name={isOpen ? 'up' : 'down'}
                  size={18}
                  color={isOpen ? colors.primary : colors.textMuted}
                />
              </TouchableOpacity>
              {isOpen ? <Text style={styles.answer}>{item.answer}</Text> : null}
            </View>
          );
        })}
      </SectionCard>
    </Screen>
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 20,
    backgroundColor: colors.surfaceAlt,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  itemActive: {
    backgroundColor: '#DDE7FF',
  },
  questionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  question: {
    fontWeight: '600',
    color: colors.textMuted,
  },
  questionActive: {
    color: colors.text,
  },
  answer: {
    marginTop: spacing.sm,
    color: colors.text,
    lineHeight: 20,
  },
});

export default FaqScreen;
