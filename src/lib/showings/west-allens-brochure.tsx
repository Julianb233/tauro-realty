import {
  Document,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { siteBrand, siteUrl } from "@/lib/site-config";

const MIDNIGHT = "#1A1A2E";
const OXBLOOD = "#6F2A2A";
const GOLD = "#D1AE67";
const CREAM = "#F7F4ED";
const INK = "#202030";
const MUTED = "#6D6877";
const WHITE = "#FFFFFF";

const address = "1001 West Allen's Lane";
const cityLine = "Philadelphia, PA 19119";
const showingUrl = `${siteUrl}/showings/1001-west-allens-lane`;
const brochureUrl = `${siteUrl}/api/showings/1001-west-allens-lane/brochure`;
const directionsUrl =
  "https://www.google.com/maps/search/?api=1&query=1001%20W%20Allens%20Ln%2C%20Philadelphia%2C%20PA%2019119";

export interface WestAllensBrochureProps {
  heroImageDataUrl: string;
  logoDataUrl: string;
  agentPhotoDataUrl: string;
  qrCodeDataUrl: string;
}

const facts = [
  ["4", "Bedrooms"],
  ["3.5", "Bathrooms"],
  ["2,576", "Sq Ft"],
  ["0.49", "Acres"],
];

const details = [
  ["Property Type", "Detached single-family"],
  ["Neighborhood", "West Mount Airy"],
  ["Lot Size", "21,537 sq ft"],
  ["Garage", "2-car"],
  ["Built", "1975"],
  ["Showing Use", "Buyer tour handout"],
];

const checklist = [
  "Walk the exterior first: driveway, garage, grading, roofline, masonry, and tree coverage.",
  "Evaluate natural light, room flow, storage, mechanical spaces, and deferred maintenance signals.",
  "Confirm disclosures, inspection priorities, seller notes, and current MLS status before offer decisions.",
  "Capture buyer questions before leaving the block so follow-up is specific and complete.",
];

const styles = StyleSheet.create({
  page: {
    backgroundColor: CREAM,
    color: INK,
    fontFamily: "Helvetica",
    padding: 32,
  },
  heroPage: {
    backgroundColor: MIDNIGHT,
    color: WHITE,
    padding: 0,
  },
  heroImage: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  heroOverlay: {
    position: "absolute",
    inset: 0,
    backgroundColor: "rgba(10,10,22,0.58)",
  },
  heroContent: {
    position: "relative",
    minHeight: "100%",
    padding: 34,
    justifyContent: "space-between",
  },
  logo: {
    width: 150,
    height: 34,
    objectFit: "contain",
  },
  eyebrow: {
    color: GOLD,
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 3.2,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  heroTitle: {
    color: WHITE,
    fontSize: 42,
    fontWeight: 700,
    lineHeight: 1.05,
    maxWidth: 430,
  },
  heroCity: {
    color: GOLD,
    fontSize: 24,
    fontWeight: 700,
    marginTop: 8,
  },
  heroText: {
    color: "#F4F0F3",
    fontSize: 12,
    lineHeight: 1.55,
    marginTop: 16,
    maxWidth: 390,
  },
  heroPanel: {
    backgroundColor: MIDNIGHT,
    borderLeft: `4 solid ${GOLD}`,
    padding: 18,
    width: "78%",
  },
  statRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 24,
  },
  stat: {
    backgroundColor: "#25253C",
    border: `1 solid ${GOLD}`,
    padding: 10,
    width: "23.5%",
  },
  statValue: {
    color: WHITE,
    fontSize: 18,
    fontWeight: 700,
    marginBottom: 3,
  },
  statLabel: {
    color: "#D9D2D7",
    fontSize: 7,
    letterSpacing: 1.3,
    textTransform: "uppercase",
  },
  goldBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: GOLD,
  },
  header: {
    borderBottom: `1 solid ${GOLD}`,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
    paddingBottom: 12,
  },
  headerTitle: {
    color: MIDNIGHT,
    fontSize: 18,
    fontWeight: 700,
  },
  headerSub: {
    color: MUTED,
    fontSize: 9,
    marginTop: 3,
  },
  smallLogo: {
    color: GOLD,
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: 2,
  },
  mainPhoto: {
    height: 236,
    objectFit: "cover",
    width: "100%",
    marginBottom: 16,
  },
  sectionTitle: {
    color: MIDNIGHT,
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 8,
  },
  paragraph: {
    color: "#403D4E",
    fontSize: 10.5,
    lineHeight: 1.55,
    marginBottom: 14,
  },
  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 18,
  },
  detailBox: {
    backgroundColor: WHITE,
    border: "1 solid #E3D8C2",
    padding: 10,
    width: "31.8%",
  },
  detailLabel: {
    color: MUTED,
    fontSize: 7.5,
    letterSpacing: 1.2,
    marginBottom: 4,
    textTransform: "uppercase",
  },
  detailValue: {
    color: MIDNIGHT,
    fontSize: 10,
    fontWeight: 700,
  },
  checklistItem: {
    borderBottom: "1 solid #DED2BA",
    color: "#403D4E",
    fontSize: 10,
    lineHeight: 1.45,
    paddingBottom: 8,
    marginBottom: 8,
  },
  split: {
    flexDirection: "row",
    gap: 18,
  },
  leftCol: {
    flex: 1.15,
  },
  rightCol: {
    flex: 0.85,
  },
  darkCard: {
    backgroundColor: MIDNIGHT,
    color: WHITE,
    padding: 16,
  },
  darkCardTitle: {
    color: GOLD,
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 2,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  darkCardText: {
    color: WHITE,
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 6,
  },
  link: {
    color: GOLD,
    textDecoration: "none",
  },
  agentRow: {
    flexDirection: "row",
    gap: 14,
    marginTop: 18,
  },
  agentPhoto: {
    height: 104,
    objectFit: "cover",
    width: 104,
  },
  agentName: {
    color: MIDNIGHT,
    fontSize: 17,
    fontWeight: 700,
    marginBottom: 4,
  },
  agentMeta: {
    color: MUTED,
    fontSize: 9.5,
    lineHeight: 1.5,
  },
  qr: {
    height: 94,
    width: 94,
    marginTop: 10,
  },
  footer: {
    position: "absolute",
    left: 32,
    right: 32,
    bottom: 20,
    borderTop: "1 solid #D8C69E",
    color: MUTED,
    fontSize: 7.5,
    lineHeight: 1.35,
    paddingTop: 8,
  },
  disclaimer: {
    color: MUTED,
    fontSize: 8.5,
    lineHeight: 1.45,
    marginTop: 16,
  },
});

function Footer() {
  return (
    <Text style={styles.footer}>
      Prepared by LYL Realty Group. Information is for showing support only and
      should be verified against current MLS data, disclosures, and inspection
      findings before client-facing claims or offer decisions.
    </Text>
  );
}

export function WestAllensBrochure({
  heroImageDataUrl,
  logoDataUrl,
  agentPhotoDataUrl,
  qrCodeDataUrl,
}: WestAllensBrochureProps) {
  return (
    <Document
      title={`${address} Showing Brochure`}
      author="LYL Realty Group"
      subject="Private showing brochure"
      creator="lylrealty.com"
    >
      <Page size="LETTER" style={styles.heroPage}>
        <Image src={heroImageDataUrl} style={styles.heroImage} />
        <View style={styles.heroOverlay} />
        <View style={styles.goldBar} />
        <View style={styles.heroContent}>
          <Image src={logoDataUrl} style={styles.logo} />
          <View style={styles.heroPanel}>
            <Text style={styles.eyebrow}>Private Showing Brochure</Text>
            <Text style={styles.heroTitle}>{address}</Text>
            <Text style={styles.heroCity}>{cityLine}</Text>
            <Text style={styles.heroText}>
              A polished showing handout for touring this West Mount Airy
              detached residence. Use it on-site to keep property facts, tour
              priorities, and follow-up steps in one place.
            </Text>
            <View style={styles.statRow}>
              {facts.map(([value, label]) => (
                <View key={label} style={styles.stat}>
                  <Text style={styles.statValue}>{value}</Text>
                  <Text style={styles.statLabel}>{label}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>

      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Property Details</Text>
            <Text style={styles.headerSub}>{address}, {cityLine}</Text>
          </View>
          <Text style={styles.smallLogo}>LYL</Text>
        </View>

        <Image src={heroImageDataUrl} style={styles.mainPhoto} />
        <Text style={styles.sectionTitle}>About This Showing</Text>
        <Text style={styles.paragraph}>
          This page and brochure are built for the showing workflow: confirm the
          facts, walk the property consistently, and capture next questions
          before the client leaves the home. Public-record basics are summarized
          here; final decisions should be confirmed against MLS status,
          disclosures, and inspections.
        </Text>

        <View style={styles.detailGrid}>
          {details.map(([label, value]) => (
            <View key={label} style={styles.detailBox}>
              <Text style={styles.detailLabel}>{label}</Text>
              <Text style={styles.detailValue}>{value}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Showing Checklist</Text>
        {checklist.map((item) => (
          <Text key={item} style={styles.checklistItem}>{item}</Text>
        ))}
        <Footer />
      </Page>

      <Page size="LETTER" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Tour Follow-Up</Text>
            <Text style={styles.headerSub}>{address}, {cityLine}</Text>
          </View>
          <Text style={styles.smallLogo}>LYL</Text>
        </View>

        <View style={styles.split}>
          <View style={styles.leftCol}>
            <Text style={styles.sectionTitle}>Buyer Questions To Capture</Text>
            <Text style={styles.checklistItem}>1. What stood out positively during the walkthrough?</Text>
            <Text style={styles.checklistItem}>2. What needs clarification from disclosures, seller notes, or MLS details?</Text>
            <Text style={styles.checklistItem}>3. Which condition items should be prioritized for inspection?</Text>
            <Text style={styles.checklistItem}>4. Does the layout, parking, outdoor maintenance, and location match the buyer&apos;s actual use case?</Text>

            <View style={styles.agentRow}>
              <Image src={agentPhotoDataUrl} style={styles.agentPhoto} />
              <View>
                <Text style={styles.agentName}>Tony Goodman</Text>
                <Text style={styles.agentMeta}>LYL Realty Group</Text>
                <Text style={styles.agentMeta}>{siteBrand.displayPhone}</Text>
                <Text style={styles.agentMeta}>{siteBrand.email}</Text>
              </View>
            </View>
          </View>

          <View style={styles.rightCol}>
            <View style={styles.darkCard}>
              <Text style={styles.darkCardTitle}>Showing Links</Text>
              <Text style={styles.darkCardText}>
                Page: <Link src={showingUrl} style={styles.link}>Open showing page</Link>
              </Text>
              <Text style={styles.darkCardText}>
                PDF: <Link src={brochureUrl} style={styles.link}>Download brochure</Link>
              </Text>
              <Text style={styles.darkCardText}>
                Directions: <Link src={directionsUrl} style={styles.link}>Open Google Maps</Link>
              </Text>
              <Image src={qrCodeDataUrl} style={styles.qr} />
              <Text style={styles.darkCardText}>Scan to open the live showing page.</Text>
            </View>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          This brochure is for informational and showing-support purposes only.
          Public records, listing status, taxes, schools, dimensions, condition,
          and availability should be independently verified before presentation
          as final client-facing fact.
        </Text>
        <Footer />
      </Page>
    </Document>
  );
}
