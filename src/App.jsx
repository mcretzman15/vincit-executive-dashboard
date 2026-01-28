import React, { useState, useMemo } from 'react';

// Embedded HubSpot deal data - pulled from live API
const HUBSPOT_DATA = {
  deals: [
    { id: "53821904796", dealname: "Cargill Test Deal", amount: 500000, closedate: "2026-02-27", owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-26" },
    { id: "53821965358", dealname: "Cargill Test", amount: 500000, closedate: "2026-02-27", owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-26" },
    { id: "54010784325", dealname: "Cargill - Chicago - Hand soap", amount: 1000000, closedate: "2026-01-31", owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54020446127", dealname: "Simmon's Corporate Account", amount: 986960, closedate: "2026-03-31", owner_id: "87129317", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54050155915", dealname: "The Deli Source / Warren WI / QSI", amount: 570960, closedate: "2026-01-31", owner_id: "87129317", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54050156095", dealname: "Godshall's / Lebonan PA / QSI", amount: 2000000, closedate: "2026-03-31", owner_id: "87129317", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54078589023", dealname: "Intermountain Packing / Idaho Falls ID / QSI", amount: 2000000, closedate: "2026-03-31", owner_id: "87129317", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54078604111", dealname: "Wayne-Sanderson Farms / Bryan Tx / Intervention", amount: 2500000, closedate: "2026-03-31", owner_id: "87132088", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-21" },
    { id: "54078697537", dealname: "The Deli Source / Waterloo WI / QSI", amount: 388000, closedate: "2026-03-31", owner_id: "87129317", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54078735794", dealname: "Volpi Foods / St Louis MO / QSI", amount: 1179360, closedate: "2026-04-01", owner_id: "87184916", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-21" },
    { id: "54078735891", dealname: "Volpi Foods / Union MO / QSI", amount: 1038960, closedate: "2026-04-01", owner_id: "87184916", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-26" },
    { id: "54078735916", dealname: "John Soules Foods / Tyler TX / QSI", amount: 5126160, closedate: "2026-04-01", owner_id: "87184916", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-21" },
    { id: "54101248652", dealname: "Dole Fresh Vegetables / Springfield OH / QSI", amount: 3150160, closedate: "2026-03-31", owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54103299472", dealname: "AFG / Green Bay WI Harvest / QSI", amount: 3093740, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54105474834", dealname: "The Deli Source / Kenosha WI / QSI", amount: 586560, closedate: "2026-03-31", owner_id: "87129317", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54109995422", dealname: "Johnsonville / Sheboygan Falls WI / ZEE F&B", amount: 30000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: "2026-01-24", lastmodified: "2026-01-24" },
    { id: "54119880228", dealname: "Tyson / Goodlettesville TN / QSI", amount: 5557760, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-23" },
    { id: "54127409176", dealname: "Cargill / Spruce Grove AL Canada/ QSI", amount: 1326000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54128067236", dealname: "Hello Fresh / Aurora IL / QSI", amount: 13780000, closedate: "2026-04-01", owner_id: "87184916", pipeline: "855678765", notes_last_updated: "2026-01-21", lastmodified: "2026-01-26" },
    { id: "54128067439", dealname: "Pepperridge Farms / Lakeland FL / QSI", amount: 2026960, closedate: "2026-04-01", owner_id: "87184916", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-21" },
    { id: "54128392042", dealname: "Boars Head / Petersburg VA / QSI", amount: 1714960, closedate: "2026-03-31", owner_id: "87129317", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-21" },
    { id: "54166620754", dealname: "AFG / Gibbon NE / ZEE Intervention", amount: 100000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54170172687", dealname: "Cargill / Sani-pro 5x / ZEE F&B", amount: 1000000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54181222283", dealname: "Producer / Amarillo TX / ZEE Intervention", amount: 1000000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54183438491", dealname: "Cargill / Dodge City KS / ZEE W&E", amount: 1000000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-24" },
    { id: "54187793726", dealname: "Johnsonville / Sheboygan Falls WI / ZEE W&E", amount: 10000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54190570876", dealname: "Walmart Man / Thomasville GA / ZEE F&B", amount: 100000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54194046641", dealname: "Simmons / Van Buren AR / QSI", amount: 4765020, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54194404116", dealname: "AFG / Green Bay WI East River / QSI", amount: 1653028, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54196395612", dealname: "Sustainable / North Platte NE / QSI", amount: 294996, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54206228352", dealname: "Simmons / Van Buren AR / QSI", amount: 3817840, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54208553267", dealname: "Producer / Amarillo TX / QSI", amount: 5000000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54208573056", dealname: "AFG-AHP / Wright City MO / ZEE F&B", amount: 250000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-24" },
    { id: "54208618509", dealname: "Cargill / Corp / ZEE Intervention", amount: 7000000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54208622595", dealname: "AFG / Green Bay WI / QSI", amount: 742560, closedate: "2026-02-18", owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-26" },
    { id: "54208700334", dealname: "Producer / Amarillo TX / ZEE W&E", amount: 500000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54208704352", dealname: "AFG / Gibbon NE / QSI", amount: 3222960, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54208715678", dealname: "AFG / Long Prairie MN / QSI", amount: 1664000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54208725168", dealname: "Tyson / Chicago IL / QSI", amount: 1241760, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54208729105", dealname: "Producer Owned Beef / Amarillo TX / ZEE F&B", amount: 500000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54210588593", dealname: "Cargill / Fort Worth Cook / ZEE W&E", amount: 100000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-24" },
    { id: "54210601070", dealname: "Walmart Man / Robinson TX / TCS", amount: 400000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54210611492", dealname: "Simmons / Dubuque IA / QSI", amount: 986960, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54210615404", dealname: "Tyson / Sherman TX / QSI", amount: 5000000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54210634804", dealname: "Tyson / Madison, NE (Pork) / QSI", amount: 5000000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-23" },
    { id: "54210648191", dealname: "Simmons / Ft Smith AR / QSI", amount: 1378000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-26" },
    { id: "54210649763", dealname: "Johnsonville / Holton KS / QSI", amount: 1182740, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: "2026-01-24", lastmodified: "2026-01-24" },
    { id: "54210655584", dealname: "Walmart Man / Fort Wayne IN / ZEE F&B", amount: 600000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54210656874", dealname: "Tyson / Corp / ZEE Intervention", amount: 5000000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-22" },
    { id: "54210668095", dealname: "Cargill / Sani-pro 5x / QSI", amount: 1600000, closedate: null, owner_id: "87131928", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-20" },
    { id: "54223487072", dealname: "Tyson Foods / Caseyville IL / QSI", amount: 3774160, closedate: "2026-04-01", owner_id: "87184498", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-21" },
    { id: "54223487275", dealname: "IRCA Group / Afton MO / QSI", amount: 1293760, closedate: "2026-04-01", owner_id: "87184498", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-21" },
    { id: "54223518390", dealname: "Resers / Topeka Deer Creek / QSI", amount: 4420000, closedate: "2026-03-31", owner_id: "87184702", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-21" },
    { id: "54223524698", dealname: "Monogram / All / ZEE F&B", amount: 1800000, closedate: "2026-03-31", owner_id: "87132088", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-23" },
    { id: "54223527282", dealname: "US Foods Stockyards / Greensburg PA", amount: 353600, closedate: "2026-04-01", owner_id: "87185119", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-22" },
    { id: "54223770384", dealname: "Bridgetown Natural Foods / Mt. Juliet TN / TCS", amount: 55000, closedate: "2026-01-31", owner_id: "87238944", pipeline: "855656590", notes_last_updated: null, lastmodified: "2026-01-22" },
    { id: "54230706451", dealname: "Hertzog Beef / Butler MO / QSI", amount: 400000, closedate: "2026-04-01", owner_id: "87184498", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-21" },
    { id: "54233644341", dealname: "Essentia Protein Solutions", amount: 560560, closedate: "2026-04-01", owner_id: "87184498", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-21" },
    { id: "54237477423", dealname: "Hello Fresh / Burr Ridge IL / QSI", amount: 2865200, closedate: "2026-04-01", owner_id: "87184916", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-21" },
    { id: "54267560079", dealname: "Wholestone Foods / Freemont NE / ZEE F&B", amount: 605000, closedate: "2026-03-31", owner_id: "87184702", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-21" },
    { id: "54267611525", dealname: "Resers / All / ZEE F&B", amount: 2500000, closedate: "2026-03-31", owner_id: "87184702", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-21" },
    { id: "54267624469", dealname: "Quaker Oats / Cedar Rapids IA / TCS", amount: 118000, closedate: "2026-03-31", owner_id: "87184702", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-21" },
    { id: "54267634101", dealname: "F&G Foodgroup / Lebanon TN / QSI", amount: 2026000, closedate: "2026-03-31", owner_id: "87184702", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-21" },
    { id: "54276667499", dealname: "John Soules Food / Gainesville / QSI", amount: 4034160, closedate: "2026-03-31", owner_id: "87132088", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-23" },
    { id: "54277379241", dealname: "John Soules Food / Valley / QSI", amount: 4502160, closedate: null, owner_id: "87132088", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-27" },
    { id: "54278407500", dealname: "Kelly's Foods / Winter Gardens FL / QSI", amount: 442000, closedate: "2026-04-01", owner_id: "87185119", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-24" },
    { id: "54286712641", dealname: "John Soules Foods / Tyler TX / QSI", amount: 5126160, closedate: "2026-03-31", owner_id: "87132088", pipeline: "852403303", notes_last_updated: null, lastmodified: "2026-01-23" },
    { id: "54286733582", dealname: "Mars / Gainsville GA / QSI", amount: 1261000, closedate: "2026-04-01", owner_id: "87185119", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-22" },
    { id: "54287937889", dealname: "John Soules Foods / Gainesville GA / QSI", amount: 4134000, closedate: "2026-04-01", owner_id: "87185119", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-22" },
    { id: "54287937968", dealname: "Trinity Frozen Foods", amount: 357760, closedate: "2026-04-01", owner_id: "87185119", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-24" },
    { id: "54288528912", dealname: "John Soules Foods / Valley AL / QSI", amount: 5590000, closedate: "2026-04-01", owner_id: "87185119", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-22" },
    { id: "54314907484", dealname: "Perdue / All Sites / ZEE W&E", amount: 6000000, closedate: "2026-03-31", owner_id: "87132142", pipeline: "855656590", notes_last_updated: null, lastmodified: "2026-01-22" },
    { id: "54314910519", dealname: "Perdue / All Sites / ZEE F&B", amount: 2000000, closedate: "2026-03-31", owner_id: "87132142", pipeline: "855656590", notes_last_updated: null, lastmodified: "2026-01-22" },
    { id: "54315075998", dealname: "Boars Head / Petersburg / QSI", amount: 2000000, closedate: "2026-03-31", owner_id: "87132142", pipeline: "855656590", notes_last_updated: null, lastmodified: "2026-01-22" },
    { id: "54315076197", dealname: "Boars Head / Jarratt / ZEE W&E", amount: 100000, closedate: "2026-03-31", owner_id: "87132142", pipeline: "855656590", notes_last_updated: null, lastmodified: "2026-01-22" },
    { id: "54315281941", dealname: "US Foods Stockyards / Lexington NC / QSI", amount: 3218280, closedate: "2026-06-01", owner_id: "87185119", pipeline: "855678765", notes_last_updated: null, lastmodified: "2026-01-23" },
    { id: "54316223113", dealname: "Boars Head / Petersburg / ZEE F&B", amount: 175000, closedate: "2026-03-31", owner_id: "87132142", pipeline: "855656590", notes_last_updated: null, lastmodified: "2026-01-22" },
    { id: "54317805080", dealname: "Case Farms / Farmerville / ZEE Intervention", amount: 1750000, closedate: "2026-03-31", owner_id: "87132142", pipeline: "855656590", notes_last_updated: null, lastmodified: "2026-01-22" },
    { id: "54319882547", dealname: "Peco Foods / Pocahontas AR / ZEE F&B", amount: 5000000, closedate: "2026-08-28", owner_id: "87238944", pipeline: "855656590", notes_last_updated: null, lastmodified: "2026-01-22" },
    { id: "54319890741", dealname: "Bobo's / Loveland CO / QSI", amount: 1553760, closedate: "2026-04-07", owner_id: "87420199", pipeline: "855656590", notes_last_updated: null, lastmodified: "2026-01-23" },
    { id: "54320603475", dealname: "Bridgetown Natural Foods / Mt. Juliet TN / ZEE F&B", amount: 300000, closedate: "2026-02-16", owner_id: "87238944", pipeline: "855656590", notes_last_updated: null, lastmodified: "2026-01-24" },
    { id: "54324739347", dealname: "Greater Omaha Packing / Omaha NE / ZEE-GOP", amount: 1300000, closedate: "2026-07-02", owner_id: "87420199", pipeline: "855656590", notes_last_updated: null, lastmodified: "2026-01-23" },
    { id: "54326474503", dealname: "Walmart / Thomasville GA / ZEE", amount: 350000, closedate: "2026-05-09", owner_id: "87420199", pipeline: "855656590", notes_last_updated: null, lastmodified: "2026-01-23" },
    { id: "54326490415", dealname: "Hertzog Meat Co / Butler MO / QSI", amount: 569920, closedate: "2026-03-03", owner_id: "87420199", pipeline: "855656590", notes_last_updated: null, lastmodified: "2026-01-23" },
    { id: "54616113730", dealname: "Brady's Test Deal / Guymon / QSI", amount: 1000000, closedate: "2026-03-31", owner_id: "86370196", pipeline: "852403303", notes_last_updated: "2026-01-26", lastmodified: "2026-01-27" },
    { id: "54739997828", dealname: "Ajinomoto Listeria Phage", amount: 100000, closedate: "2026-02-02", owner_id: "87238944", pipeline: "default", notes_last_updated: null, lastmodified: "2026-01-27" }
  ],
  owners: {
    "87131928": "Chad Lawrence",
    "87129317": "Ben Hope",
    "87132088": "Brian Hales",
    "87184916": "Greg Atchley",
    "87184498": "Eric Wilson",
    "87184702": "Ryan McCormick",
    "87185119": "Jeremy Bates",
    "87132142": "Rikki Ford",
    "87238944": "Shane Calhoun",
    "87420199": "Matthew Husman",
    "86370196": "Brady Field"
  },
  pipelines: {
    "852403303": "Vincit Enterprise",
    "855678765": "QSI BDM",
    "855656590": "SAM Pipeline",
    "default": "Sales Pipeline"
  }
};

// Helper functions
const formatCurrency = (amount, short = false) => {
  if (!amount || amount === 0) return '$0';
  if (short) {
    if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`;
    if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
};

const formatDate = (dateStr) => {
  if (!dateStr) return 'TBD';
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const getBusinessGroup = (dealname) => {
  const name = dealname.toLowerCase();
  if (name.includes('zee intervention') || name.includes('/ intervention')) return 'ZEE Intervention';
  if (name.includes('zee f&b') || name.includes('/ zee f&b')) return 'ZEE F&B';
  if (name.includes('zee w&e') || name.includes('/ zee w&e')) return 'ZEE W&E';
  if (name.includes('/ tcs')) return 'TCS';
  if (name.includes('/ zee') || name.includes('zee-')) return 'ZEE';
  if (name.includes('/ qsi') || name.includes('qsi')) return 'QSI';
  return 'Other';
};

const daysSince = (dateStr) => {
  if (!dateStr) return Infinity;
  const date = new Date(dateStr);
  const now = new Date();
  return Math.floor((now - date) / (1000 * 60 * 60 * 24));
};

// KPI Card Component
const KPICard = ({ title, value, subtitle, highlight }) => (
  <div style={{
    background: highlight ? 'linear-gradient(135deg, #1e40af 0%, #1a365d 100%)' : '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    flex: 1,
    minWidth: '150px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
    border: highlight ? 'none' : '1px solid #e2e8f0'
  }}>
    <div style={{ 
      fontSize: '12px', 
      fontWeight: '600',
      color: highlight ? 'rgba(255,255,255,0.8)' : '#64748b',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '8px'
    }}>{title}</div>
    <div style={{ 
      fontSize: '28px', 
      fontWeight: '700',
      color: highlight ? '#ffffff' : '#1a365d',
      fontFamily: "'DM Serif Display', Georgia, serif"
    }}>{value}</div>
    {subtitle && <div style={{ 
      fontSize: '11px', 
      color: highlight ? 'rgba(255,255,255,0.7)' : '#94a3b8',
      marginTop: '4px'
    }}>{subtitle}</div>}
  </div>
);

// Progress Bar Component
const HorizontalBar = ({ label, value, maxValue, color }) => {
  const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginBottom: '4px',
        fontSize: '13px'
      }}>
        <span style={{ color: '#334155', fontWeight: '500' }}>{label}</span>
        <span style={{ color: '#1a365d', fontWeight: '600' }}>{formatCurrency(value, true)}</span>
      </div>
      <div style={{ 
        background: '#e2e8f0', 
        borderRadius: '6px', 
        height: '10px',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${Math.min(percentage, 100)}%`,
          height: '100%',
          background: color || 'linear-gradient(90deg, #1e40af, #3b82f6)',
          borderRadius: '6px',
          transition: 'width 0.5s ease'
        }} />
      </div>
    </div>
  );
};

// Pie Chart Component (CSS-based)
const PieChart = ({ data }) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;
  
  const colors = ['#1e40af', '#3b82f6', '#60a5fa', '#93c5fd', '#059669', '#f59e0b', '#94a3b8'];
  
  const gradientStops = data.map((d, i) => {
    const start = cumulative;
    const percentage = (d.value / total) * 100;
    cumulative += percentage;
    return `${colors[i % colors.length]} ${start}% ${cumulative}%`;
  }).join(', ');

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{
        width: '140px',
        height: '140px',
        borderRadius: '50%',
        background: `conic-gradient(${gradientStops})`,
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70px',
          height: '70px',
          background: '#fff',
          borderRadius: '50%'
        }} />
      </div>
      <div style={{ flex: 1 }}>
        {data.slice(0, 6).map((d, i) => (
          <div key={d.label} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            marginBottom: '6px',
            fontSize: '12px'
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '2px',
              background: colors[i % colors.length],
              marginRight: '8px'
            }} />
            <span style={{ color: '#475569', flex: 1 }}>{d.label}</span>
            <span style={{ color: '#1a365d', fontWeight: '600' }}>{formatCurrency(d.value, true)}</span>
            <span style={{ color: '#94a3b8', marginLeft: '6px', fontSize: '11px' }}>
              ({((d.value / total) * 100).toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Section Component
const Section = ({ title, subtitle, children, warning }) => (
  <div style={{
    background: warning ? 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)' : '#ffffff',
    borderRadius: '16px',
    padding: '24px',
    marginBottom: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    border: warning ? '2px solid #fca5a5' : '1px solid #e2e8f0'
  }}>
    <div style={{ 
      display: 'flex', 
      alignItems: 'center',
      marginBottom: subtitle ? '4px' : '20px'
    }}>
      {warning && <span style={{ fontSize: '20px', marginRight: '8px' }}>⚠️</span>}
      <h2 style={{ 
        fontSize: '18px', 
        fontWeight: '700',
        color: warning ? '#991b1b' : '#1a365d',
        margin: 0,
        fontFamily: "'DM Serif Display', Georgia, serif"
      }}>{title}</h2>
    </div>
    {subtitle && <p style={{ 
      fontSize: '12px', 
      color: warning ? '#b91c1c' : '#64748b',
      marginTop: 0,
      marginBottom: '16px'
    }}>{subtitle}</p>}
    {children}
  </div>
);

// Main Dashboard Component
export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('amount');
  const [sortDirection, setSortDirection] = useState('desc');

  const deals = HUBSPOT_DATA.deals;
  const owners = HUBSPOT_DATA.owners;
  const pipelines = HUBSPOT_DATA.pipelines;

  // Calculate KPIs
  const kpis = useMemo(() => {
    const dealsWithAmount = deals.filter(d => d.amount && d.amount > 0);
    const totalPipeline = dealsWithAmount.reduce((sum, d) => sum + d.amount, 0);
    const avgDealSize = dealsWithAmount.length > 0 ? totalPipeline / dealsWithAmount.length : 0;
    
    const now = new Date();
    const quarterEnd = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3 + 3, 0);
    const dealsThisQuarter = deals.filter(d => {
      if (!d.closedate) return false;
      const closeDate = new Date(d.closedate);
      return closeDate <= quarterEnd && closeDate >= new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
    });

    return {
      totalPipeline,
      activeDeals: dealsWithAmount.length,
      avgDealSize,
      dealsThisQuarter: dealsThisQuarter.length
    };
  }, [deals]);

  // Pipeline by Owner
  const pipelineByOwner = useMemo(() => {
    const ownerData = {};
    deals.forEach(deal => {
      if (!deal.amount || deal.amount <= 0) return;
      const ownerName = owners[deal.owner_id] || 'Unassigned';
      if (!ownerData[ownerName]) {
        ownerData[ownerName] = { total: 0, count: 0 };
      }
      ownerData[ownerName].total += deal.amount;
      ownerData[ownerName].count += 1;
    });
    
    return Object.entries(ownerData)
      .map(([name, data]) => ({
        name,
        total: data.total,
        count: data.count,
        avg: data.total / data.count
      }))
      .sort((a, b) => b.total - a.total);
  }, [deals, owners]);

  // Pipeline by Business Group
  const pipelineByGroup = useMemo(() => {
    const groupData = {};
    deals.forEach(deal => {
      if (!deal.amount || deal.amount <= 0) return;
      const group = getBusinessGroup(deal.dealname);
      if (!groupData[group]) groupData[group] = 0;
      groupData[group] += deal.amount;
    });
    
    return Object.entries(groupData)
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
  }, [deals]);

  // Pipeline by Close Month
  const pipelineByMonth = useMemo(() => {
    const monthData = {};
    let noDateDeals = { count: 0, total: 0 };
    
    deals.forEach(deal => {
      if (!deal.amount || deal.amount <= 0) return;
      if (!deal.closedate) {
        noDateDeals.count += 1;
        noDateDeals.total += deal.amount;
        return;
      }
      const date = new Date(deal.closedate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const monthLabel = date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
      
      if (!monthData[monthKey]) {
        monthData[monthKey] = { label: monthLabel, value: 0, count: 0 };
      }
      monthData[monthKey].value += deal.amount;
      monthData[monthKey].count += 1;
    });
    
    const sortedMonths = Object.entries(monthData)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([_, data]) => data);
    
    return { months: sortedMonths, noDateDeals };
  }, [deals]);

  // Top 15 Deals
  const topDeals = useMemo(() => {
    return [...deals]
      .filter(d => d.amount && d.amount > 0)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 15);
  }, [deals]);

  // At Risk Deals ($3M+, no activity in 30 days)
  const atRiskDeals = useMemo(() => {
    return deals.filter(deal => {
      if (!deal.amount || deal.amount < 3000000) return false;
      const lastActivity = deal.notes_last_updated || deal.lastmodified;
      return daysSince(lastActivity) > 30 || !lastActivity;
    }).sort((a, b) => b.amount - a.amount);
  }, [deals]);

  // Full Deal List (filtered & sorted)
  const filteredDeals = useMemo(() => {
    let filtered = deals.filter(d => d.amount && d.amount > 0);
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(d => 
        d.dealname.toLowerCase().includes(term) ||
        (owners[d.owner_id] || '').toLowerCase().includes(term) ||
        getBusinessGroup(d.dealname).toLowerCase().includes(term)
      );
    }
    
    return filtered.sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (sortField === 'owner') {
        aVal = owners[a.owner_id] || '';
        bVal = owners[b.owner_id] || '';
      }
      if (sortField === 'group') {
        aVal = getBusinessGroup(a.dealname);
        bVal = getBusinessGroup(b.dealname);
      }
      
      if (typeof aVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDirection === 'asc' ? (aVal || 0) - (bVal || 0) : (bVal || 0) - (aVal || 0);
    });
  }, [deals, searchTerm, sortField, sortDirection, owners]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const maxOwnerPipeline = pipelineByOwner.length > 0 ? pipelineByOwner[0].total : 0;

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: 'linear-gradient(180deg, #f1f5f9 0%, #e2e8f0 100%)',
      minHeight: '100vh',
      padding: '24px'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a365d 0%, #1e40af 100%)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '24px',
        boxShadow: '0 10px 40px rgba(30, 64, 175, 0.3)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '24px'
        }}>
          <div>
            <div style={{ 
              fontSize: '12px', 
              color: 'rgba(255,255,255,0.6)', 
              letterSpacing: '3px',
              fontWeight: '600',
              marginBottom: '8px'
            }}>VINCIT GROUP</div>
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: '700',
              color: '#ffffff',
              margin: 0,
              fontFamily: "'DM Serif Display', Georgia, serif"
            }}>Sales Pipeline Executive Dashboard</h1>
          </div>
          <div style={{ 
            textAlign: 'right',
            color: 'rgba(255,255,255,0.8)',
            fontSize: '13px'
          }}>
            <div style={{ fontWeight: '600' }}>{today}</div>
            <div style={{ fontSize: '11px', marginTop: '4px', opacity: 0.7 }}>
              Live Data from HubSpot CRM
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <KPICard 
            title="Total Pipeline" 
            value={formatCurrency(kpis.totalPipeline, true)}
            subtitle="All active opportunities"
            highlight
          />
          <KPICard 
            title="Active Deals" 
            value={kpis.activeDeals}
            subtitle="With assigned value"
          />
          <KPICard 
            title="Avg Deal Size" 
            value={formatCurrency(kpis.avgDealSize, true)}
            subtitle="Per opportunity"
          />
          <KPICard 
            title="Closing Q1" 
            value={kpis.dealsThisQuarter}
            subtitle="Expected this quarter"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        {/* Pipeline by Owner */}
        <Section title="Pipeline by Deal Owner">
          {pipelineByOwner.slice(0, 8).map(owner => (
            <HorizontalBar 
              key={owner.name}
              label={owner.name}
              value={owner.total}
              maxValue={maxOwnerPipeline}
            />
          ))}
          <div style={{ 
            marginTop: '16px', 
            padding: '12px', 
            background: '#f8fafc', 
            borderRadius: '8px',
            fontSize: '12px'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ textAlign: 'left', padding: '6px 8px', color: '#64748b', fontWeight: '600' }}>Owner</th>
                  <th style={{ textAlign: 'right', padding: '6px 8px', color: '#64748b', fontWeight: '600' }}>Pipeline</th>
                  <th style={{ textAlign: 'right', padding: '6px 8px', color: '#64748b', fontWeight: '600' }}># Deals</th>
                  <th style={{ textAlign: 'right', padding: '6px 8px', color: '#64748b', fontWeight: '600' }}>Avg Size</th>
                </tr>
              </thead>
              <tbody>
                {pipelineByOwner.map(owner => (
                  <tr key={owner.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                    <td style={{ padding: '6px 8px', color: '#334155' }}>{owner.name}</td>
                    <td style={{ padding: '6px 8px', color: '#1a365d', fontWeight: '600', textAlign: 'right' }}>{formatCurrency(owner.total, true)}</td>
                    <td style={{ padding: '6px 8px', color: '#64748b', textAlign: 'right' }}>{owner.count}</td>
                    <td style={{ padding: '6px 8px', color: '#64748b', textAlign: 'right' }}>{formatCurrency(owner.avg, true)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        {/* Pipeline by Business Group */}
        <Section title="Pipeline by Business Group">
          <PieChart data={pipelineByGroup} />
        </Section>

        {/* Pipeline by Close Date */}
        <Section title="Pipeline by Expected Close Date">
          <div style={{ marginBottom: '16px' }}>
            {pipelineByMonth.months.map((month, i) => {
              const maxValue = Math.max(...pipelineByMonth.months.map(m => m.value));
              return (
                <div key={month.label} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: '8px',
                  fontSize: '13px'
                }}>
                  <span style={{ width: '60px', color: '#64748b', fontWeight: '500' }}>{month.label}</span>
                  <div style={{ flex: 1, margin: '0 12px' }}>
                    <div style={{ 
                      background: '#e2e8f0', 
                      borderRadius: '4px', 
                      height: '24px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <div style={{
                        width: `${(month.value / maxValue) * 100}%`,
                        height: '100%',
                        background: 'linear-gradient(90deg, #059669, #34d399)',
                        borderRadius: '4px'
                      }} />
                      <span style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '11px',
                        color: '#334155',
                        fontWeight: '600'
                      }}>{month.count} deals</span>
                    </div>
                  </div>
                  <span style={{ width: '70px', textAlign: 'right', color: '#1a365d', fontWeight: '600' }}>
                    {formatCurrency(month.value, true)}
                  </span>
                </div>
              );
            })}
          </div>
          
          {pipelineByMonth.noDateDeals.count > 0 && (
            <div style={{
              background: 'linear-gradient(90deg, #fef3c7, #fde68a)',
              borderRadius: '8px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '2px solid #f59e0b'
            }}>
              <div>
                <span style={{ color: '#92400e', fontWeight: '700', fontSize: '14px' }}>
                  ⚠️ {pipelineByMonth.noDateDeals.count} deals with NO CLOSE DATE
                </span>
                <div style={{ fontSize: '11px', color: '#a16207', marginTop: '2px' }}>
                  Requires immediate attention
                </div>
              </div>
              <span style={{ color: '#92400e', fontWeight: '700', fontSize: '18px' }}>
                {formatCurrency(pipelineByMonth.noDateDeals.total, true)}
              </span>
            </div>
          )}
        </Section>

        {/* Top 15 Deals */}
        <Section title="Top 15 Deals">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '10px 8px', textAlign: 'left', color: '#64748b', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>#</th>
                  <th style={{ padding: '10px 8px', textAlign: 'left', color: '#64748b', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>Deal Name</th>
                  <th style={{ padding: '10px 8px', textAlign: 'left', color: '#64748b', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>Owner</th>
                  <th style={{ padding: '10px 8px', textAlign: 'right', color: '#64748b', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>Amount</th>
                  <th style={{ padding: '10px 8px', textAlign: 'right', color: '#64748b', fontWeight: '600', borderBottom: '2px solid #e2e8f0' }}>Close Date</th>
                </tr>
              </thead>
              <tbody>
                {topDeals.map((deal, i) => (
                  <tr key={deal.id} style={{ 
                    borderBottom: '1px solid #f1f5f9',
                    background: i % 2 === 0 ? '#fff' : '#fafafa'
                  }}>
                    <td style={{ padding: '10px 8px', color: '#94a3b8', fontWeight: '600' }}>{i + 1}</td>
                    <td style={{ 
                      padding: '10px 8px', 
                      color: '#1a365d', 
                      fontWeight: '500',
                      maxWidth: '200px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>{deal.dealname}</td>
                    <td style={{ padding: '10px 8px', color: '#475569' }}>{owners[deal.owner_id] || 'Unassigned'}</td>
                    <td style={{ padding: '10px 8px', color: '#059669', fontWeight: '700', textAlign: 'right' }}>{formatCurrency(deal.amount)}</td>
                    <td style={{ 
                      padding: '10px 8px', 
                      textAlign: 'right',
                      color: deal.closedate ? '#64748b' : '#dc2626',
                      fontWeight: deal.closedate ? '400' : '600'
                    }}>{formatDate(deal.closedate)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      </div>

      {/* At Risk Section - Full Width */}
      {atRiskDeals.length > 0 && (
        <Section 
          title="High-Value Deals with No Recent Activity" 
          subtitle="These deals ($3M+) have no logged activity in the last 30 days and may need immediate attention"
          warning
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#fee2e2' }}>
                  <th style={{ padding: '10px 8px', textAlign: 'left', color: '#991b1b', fontWeight: '600' }}>Deal Name</th>
                  <th style={{ padding: '10px 8px', textAlign: 'left', color: '#991b1b', fontWeight: '600' }}>Owner</th>
                  <th style={{ padding: '10px 8px', textAlign: 'right', color: '#991b1b', fontWeight: '600' }}>Amount</th>
                  <th style={{ padding: '10px 8px', textAlign: 'right', color: '#991b1b', fontWeight: '600' }}>Close Date</th>
                  <th style={{ padding: '10px 8px', textAlign: 'left', color: '#991b1b', fontWeight: '600' }}>Group</th>
                </tr>
              </thead>
              <tbody>
                {atRiskDeals.map(deal => (
                  <tr key={deal.id} style={{ borderBottom: '1px solid #fecaca' }}>
                    <td style={{ padding: '10px 8px', color: '#991b1b', fontWeight: '600' }}>{deal.dealname}</td>
                    <td style={{ padding: '10px 8px', color: '#b91c1c' }}>{owners[deal.owner_id] || 'Unassigned'}</td>
                    <td style={{ padding: '10px 8px', color: '#dc2626', fontWeight: '700', textAlign: 'right' }}>{formatCurrency(deal.amount)}</td>
                    <td style={{ padding: '10px 8px', color: '#b91c1c', textAlign: 'right' }}>{formatDate(deal.closedate)}</td>
                    <td style={{ padding: '10px 8px', color: '#b91c1c' }}>{getBusinessGroup(deal.dealname)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {/* Full Deal List */}
      <Section title="Full Deal List">
        <div style={{ marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Search deals by name, owner, or group..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '2px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s',
              boxSizing: 'border-box'
            }}
          />
        </div>
        <div style={{ 
          maxHeight: '500px', 
          overflowY: 'auto',
          border: '1px solid #e2e8f0',
          borderRadius: '8px'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#1a365d', zIndex: 10 }}>
              <tr>
                {[
                  { key: 'owner', label: 'Owner' },
                  { key: 'dealname', label: 'Deal Name' },
                  { key: 'amount', label: 'Amount' },
                  { key: 'closedate', label: 'Close Date' },
                  { key: 'group', label: 'Group' },
                  { key: 'pipeline', label: 'Pipeline' },
                  { key: 'lastmodified', label: 'Last Activity' }
                ].map(col => (
                  <th
                    key={col.key}
                    onClick={() => handleSort(col.key)}
                    style={{ 
                      padding: '12px 8px', 
                      textAlign: col.key === 'amount' ? 'right' : 'left', 
                      color: '#fff', 
                      fontWeight: '600',
                      cursor: 'pointer',
                      userSelect: 'none'
                    }}
                  >
                    {col.label}
                    {sortField === col.key && (
                      <span style={{ marginLeft: '4px' }}>
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredDeals.map((deal, i) => (
                <tr key={deal.id} style={{ 
                  borderBottom: '1px solid #f1f5f9',
                  background: i % 2 === 0 ? '#fff' : '#f8fafc'
                }}>
                  <td style={{ padding: '10px 8px', color: '#475569' }}>{owners[deal.owner_id] || 'Unassigned'}</td>
                  <td style={{ 
                    padding: '10px 8px', 
                    color: '#1a365d', 
                    fontWeight: '500',
                    maxWidth: '200px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>{deal.dealname}</td>
                  <td style={{ padding: '10px 8px', color: '#059669', fontWeight: '600', textAlign: 'right' }}>{formatCurrency(deal.amount)}</td>
                  <td style={{ 
                    padding: '10px 8px',
                    color: deal.closedate ? '#64748b' : '#dc2626',
                    fontWeight: deal.closedate ? '400' : '600'
                  }}>{formatDate(deal.closedate)}</td>
                  <td style={{ padding: '10px 8px', color: '#64748b' }}>{getBusinessGroup(deal.dealname)}</td>
                  <td style={{ padding: '10px 8px', color: '#94a3b8', fontSize: '11px' }}>{pipelines[deal.pipeline] || deal.pipeline}</td>
                  <td style={{ padding: '10px 8px', color: '#94a3b8', fontSize: '11px' }}>{formatDate(deal.notes_last_updated || deal.lastmodified)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ 
          marginTop: '12px', 
          fontSize: '12px', 
          color: '#64748b',
          textAlign: 'right'
        }}>
          Showing {filteredDeals.length} of {deals.filter(d => d.amount > 0).length} deals
        </div>
      </Section>

      {/* Footer */}
      <div style={{ 
        textAlign: 'center', 
        padding: '24px',
        color: '#94a3b8',
        fontSize: '12px'
      }}>
        <div style={{ fontWeight: '600', color: '#64748b' }}>Vincit Group Sales Dashboard</div>
        <div>Data synced from HubSpot CRM • Updated {new Date().toLocaleString()}</div>
      </div>
    </div>
  );
}