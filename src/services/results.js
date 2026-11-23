import mechanicalRecords from '../data/results/mechanical.json';
import electronicsRecords from '../data/results/electronics.json';
import programmingRecords from '../data/results/programming.json';

const recordsByDomain = {
  mechanical: mechanicalRecords,
  electronics: electronicsRecords,
  programming: programmingRecords,
};

export async function getDomainRecords(domain) {
  const records = recordsByDomain[domain];
  if (!records) {
    throw new Error('Unknown results domain.');
  }

  return [...records].sort(
    (a, b) => a.serialNumber - b.serialNumber || a.name.localeCompare(b.name)
  );
}
