import React from 'react';
import SectionCard from '../../components/SectionCard';
import Screen from '../../components/Screen';
import ActionButton from '../../components/ActionButton';
import { spacing } from '../../theme';

const cards = [
  { title: 'Input Asset Wizard', screen: 'AssetWizard' },
  { title: 'Input Risk', screen: 'RiskWizard' },
  { title: 'Input Risk Treatment', screen: 'RiskTreatmentWizard' },
  { title: 'Input Maintenance', screen: 'MaintenanceInput' },
  { title: 'Asset Deletion', screen: 'AssetDeletion' },
  { title: 'Jadwal Pemeliharaan', screen: 'MaintenanceSchedule' },
  { title: 'Laporan Pemeliharaan Aset', screen: 'RiskReport' },
];

const AssetHubScreen = ({ navigation }) => (
  <Screen>
    {cards.map(card => (
      <SectionCard key={card.title} title={card.title}>
        <ActionButton
          label="Buka"
          onPress={() => navigation.navigate(card.screen)}
          style={{ marginTop: spacing.sm }}
        />
      </SectionCard>
    ))}
  </Screen>
);

export default AssetHubScreen;
