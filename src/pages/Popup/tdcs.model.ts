export interface TDCS {
	configName: string;
	config: Config;
	appliedConfigs: string[];
	classCode: string;
}

export interface Config {
	featureFlag: FeatureFlag;
	test: string;
	msaBanner: string;
	copyOverrides: CopyOverrides;
	tvUpgradesDistilleryEnabled: boolean;
	dePayload: DePayload;
	autoPayPaperlessDefaulted: boolean;
}

export interface CopyOverrides {
	essentials: Essentials;
	resiUnauthHomepage: ResiUnauthHomepage;
	streamingUpgradeBuyflowDetails: StreamingUpgradeBuyflowDetails;
}

export interface Essentials {
	reviewAndPurchase: ReviewAndPurchase;
}

export interface ReviewAndPurchase {
	disclaimerCopy: string;
}

export interface ResiUnauthHomepage {
	metaContent: string;
	title: string;
}

export interface StreamingUpgradeBuyflowDetails {
	streamingUpgradeBuyflow: StreamingUpgradeBuyflow;
}

export interface StreamingUpgradeBuyflow {
	streamingAddOns: Essentials;
}

export interface DePayload {
	experimentUuids: string[];
	variantUuids: string[];
}

export interface FeatureFlag {
	'__TdcsConfig:': string;
	billing: FeatureFlagBilling;
	changeService: ChangeService;
	clearExpiringAutopayCardEnabled: boolean;
	enrollActivate: EnrollActivate;
	equipment: Equipment;
	foreseeEnabled: boolean;
	mfe: Mfe;
	piNxtApis: string[];
	routes: Routes;
	searchSupportNotification: SearchSupportNotification;
	'security-suite': boolean;
	showSoftDisconnectDate: boolean;
	troubleshoot: { [key: string]: boolean };
	unifiedTermsAndConditions: boolean;
	useGeolocationforUtcOffset: boolean;
}

export interface FeatureFlagBilling {
	SPSUIEnabled: boolean;
	accountSummary: AccountSummary;
	autoPayPaperlessNotDefaulted: boolean;
	billComparisonArrows: boolean;
	billingBottomAdBanners: boolean;
	billingVerbatim: boolean;
	californiaPastDueVerbiage: boolean;
	covidMessaging: CovidMessaging;
	digitalBillEnabled: boolean;
	digitalBillSpinner: DigitalBillSpinner;
	digitalBillTransparencyMitigation: boolean;
	mobile2View: Mobile2View;
	newBillingView: Mobile2View;
	overrideDigitalBillExperiment: boolean;
	pendingPayment: boolean;
	preloadAccordions: boolean;
	primarySpinner: PrimarySpinner;
	promoRollOffEnabled: boolean;
	scheduledPaymentAlert: boolean;
	spsOTPOnlyEnabled: boolean;
	spsOTP_recurringPaymentCheckbox: boolean;
	storedInstrumentsEnabled: boolean;
	useEnhancedUnenrollContent: boolean;
}

export interface AccountSummary {
	billingCard: Mobile2View;
}

export interface Mobile2View {
	enabled: boolean;
}

export interface CovidMessaging {
	covidDeferralEnabled: string[];
	covidInstallmentsEnabled: string[];
}

export interface DigitalBillSpinner {
	enabled: boolean;
	maximumDuration: number;
	minimumDuration: number;
}

export interface PrimarySpinner {
	enabled: boolean;
	maximumDuration: number;
}

export interface ChangeService {
	buyflowEstimateTaxesApiEnabled: boolean;
	buyflowPackages: BuyflowPackages;
	buyflows: Buyflow[];
	channelLineup: ChannelLineup;
	packageDetails: PackageDetails;
	upgrades: Upgrades;
	usePackageAndOffersV3: boolean;
}

export interface BuyflowPackages {
	'419393': ChannelLineup;
	'419394': ChannelLineup;
	'419395': ChannelLineup;
	'419396': ChannelLineup;
	'419397': ChannelLineup;
	'419398': ChannelLineup;
	'419399': The419;
	'419400': The419;
	'433751': The4337;
	'433791': The4337;
	'5052101': The112_W54R;
	'111QH6H': The111_Qh6H;
	'112W54R': The112_W54R;
	'19LQUM': The111_Qh6H;
}

export interface The111_Qh6H {
	type: string;
}

export interface The112_W54R {
	__notes: string;
	name: string;
	type: string;
}

export interface ChannelLineup {
	__notes: string;
	cmsUrl: string;
	enabled: boolean;
	type?: string;
}

export interface The419 {
	__notes: string;
	enabled: boolean;
	featuredNetworks: string[];
	type: string;
	useOneClickTemplate: boolean;
}

export interface The4337 {
	featuredChannels: string[];
	type: string;
}

export interface Buyflow {
	type: string;
	enabled: boolean;
	enableAddOns: boolean;
	offerId: string;
	landingPageImage: string;
	packageIdentifiers: PackageIdentifiers;
	transformIcons: TransformIcon[];
	landingPageChannels: string[];
	deviceIcons: DeviceIcons;
	monoChromeDeviceIcons?: DeviceIcons;
}

export interface DeviceIcons {
	baseUrl: string;
	devices: Device[];
}

export interface Device {
	name: string;
	icon: string;
	link: string;
}

export interface PackageIdentifiers {
	'433821': string;
}

export interface TransformIcon {
	id: string;
	properties: Properties;
}

export interface Properties {
	height: string;
	sourceType: string;
}

export interface PackageDetails {
	__notes: string;
	cmsUrl: string;
	enabled: boolean;
	isMobileIntegrationEnabled: boolean;
	isPromoCardVisible: boolean;
}

export interface Upgrades {
	error: ChannelLineup;
	internet: ChannelLineup;
	mobile: ChannelLineup;
	tv: ChannelLineup;
}

export interface EnrollActivate {
	additionalContactsEnabled: boolean;
	bhnNotificationsTabEnabled: boolean;
	businessContactsEnabled: boolean;
	campaignGQL: boolean;
	campaigns: Campaigns;
	campaignsEnabled: boolean;
	centralizedLoginRedirectEnabled: boolean;
	centralizedLoginRedirectLandingPageEnabled: boolean;
	chtrNotificationTabEnabled: boolean;
	convergedLandingPageEnabled: boolean;
	entitlementsEnabled: boolean;
	medalliaEnabled: boolean;
	mobile: Mobile;
	mobileAccountSummary: MobileAccountSummary;
	mobileMigrationMessagingEnabled: boolean;
	mobileSettings: MobileSettings;
	peopleInviteVoiceEnabled: boolean;
	peopleVoiceAccessBhnEnabled: boolean;
	twcNotificationsTabEnabled: boolean;
	upcEnabled: boolean;
	useSettingsInfoVerificationAlert: boolean;
}

export interface Campaigns {
	BILL_AUTOPAY: boolean;
	BILL_DELIVERY_METHOD: boolean;
	INVALID_CONTACT_INFO_IDENTITY: boolean;
	NAME_ANNUAL_IDENTITY_CONTACT: boolean;
	NAME_MISSING_IDENTITY_CONTACT: boolean;
	SECURITY_QUESTION_AND_ANSWER: boolean;
}

export interface Mobile {
	activationWorkflow: boolean;
}

export interface MobileAccountSummary {
	accountSummaryNotificationsCardEnabled: boolean;
	activationFailureNotificationEnabled: boolean;
	deviceActivationInProgressNotificationEnabled: boolean;
	deviceReadyToActivateNotificationEnabled: boolean;
	mobileAccountSummaryEnabled: boolean;
	mobileYourServicesEnabled: boolean;
	reducedDataSpeedNotificationEnabled: boolean;
}

export interface MobileSettings {
	mobileContactInfoCardEnabled: boolean;
	mobileNotificationsCardsEnabled: boolean;
	notificationsGQLEnabled: boolean;
}

export interface Equipment {
	exploreCardLinksLimit: number;
}

export interface Mfe {
	billing: ChangeServiceClass;
	changeService: ChangeServiceClass;
	searchSupport: ChangeServiceClass;
	securitySuite: ChangeServiceClass;
	settings: ChangeServiceClass;
	troubleshoot: ChangeServiceClass;
	voice: ChangeServiceClass;
}

export interface ChangeServiceClass {
	DEV: string;
	ENGPROD: string;
	EPHEM: string;
	LOCAL: string;
	MOCK: string;
	PROD: string;
	QA: string;
	STAGE: string;
	UAT: string;
	isWebComponent: boolean;
}

export interface Routes {
	'account-summary': boolean;
	activation: boolean;
	'device-payment': boolean;
	'mobile-billing': boolean;
	'mobile-billing/autopay': boolean;
	'mobile-billing/payment': boolean;
	'mobile-billing/usage': boolean;
	services: Services;
	support: Support;
	'upgrade/mobile.*': boolean;
}

export interface Services {
	internet: Internet;
	mobile: boolean;
}

export interface Internet {
	'network-devices': boolean;
	'speed-test': boolean;
}

export interface Support {
	mobile: boolean;
}

export interface SearchSupportNotification {
	additionalFooterLinks: AdditionalFooterLinks;
	callbackNotifications: boolean;
	commonLandingUnauthFooter: boolean;
	commonLandingUnauthHeader: boolean;
	etrOutageNotifications: boolean;
	legalLinks: Assist[];
	pageAlertsEnabled: boolean;
	sharedFooterEnabled: boolean;
	sharedHeaderEnabled: boolean;
	sharedSupportHeaderEnabled: boolean;
	unauthLandingDirectLinkEnabled: boolean;
	upgradeEnabled: boolean;
	useM2ContextObj: boolean;
	webmailDisplayOnError: boolean;
}

export interface AdditionalFooterLinks {
	assist: Assist;
	contact: Assist;
}

export interface Assist {
	standardizedName: string;
	text: string;
	uri: string;
	newTab?: boolean;
}
