import { PpeTypeEnum } from '../../models/ppeType';
import { MessageID } from '../../locale/type';
import { DefaultValues } from 'react-hook-form';

export interface PpeRequestTypeSubForm {
  need: boolean;
  dailyShortage: number;
  dailyShortageForWhom: string;
  ppeTypeOther: string;
}

export const defaultPpeRequestTypeSubForm: PpeRequestTypeSubForm = {
  need: false,
  dailyShortage: 0,
  dailyShortageForWhom: '',
  ppeTypeOther: '',
};

export interface RegisterRequestForm {
  publishAnonymously: boolean;
  contactName: string;
  email: string;
  phoneNumber: string;
  organisationName: string;
  orgHasGovtApproval: boolean;
  orgGovtApprovalImageId: string;
  orgRegCode: string;
  orgType: string;
  orgTypeOther: string;
  orgCityId: string;
  jobTitle: string;
  department: string;
  addressLineOne: string;
  addressLineTwo: string;
  postcode: string;
  tellUsMore: string;
  ppeTypes: { [key in PpeTypeEnum]: PpeRequestTypeSubForm };
}

export const defaultRegisterRequestForm: DefaultValues<RegisterRequestForm> = {
  publishAnonymously: true,
  contactName: '',
  email: '',
  phoneNumber: '',
  organisationName: '',
  orgHasGovtApproval: false,
  orgGovtApprovalImageId: '',
  orgRegCode: '',
  orgType: '',
  orgTypeOther: '',
  jobTitle: '',
  department: '',
  addressLineOne: '',
  addressLineTwo: '',
  postcode: '',
  tellUsMore: '',
  ppeTypes: {
    [PpeTypeEnum.TypeIIRSurgicalMasks]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.FFP1RespiratorMasks]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.FFP2RespiratorMasks]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.FFP3RespiratorMasks]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.Gowns]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.Aprons]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.Gloves]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.Scrubs]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.SafetyGlasses]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.FaceVisors]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.AlcoholHandGel]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.Other]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticSanitarySanitaryTowels]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryNappies]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryBreastPads]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryHairbrushes]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryLiquidSoap]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryWetWipes]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryToothbrushes]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryToothpaste]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryTowels]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryToiletPaper]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryPocketTissues]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryShavingGelRazors]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticSanitaryOther]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticNonPerishableFoodDrinkProteinBars]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticNonPerishableFoodDrinkCannedFood]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticNonPerishableFoodDrinkDryFood]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticNonPerishableFoodDrinkInstantFood]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticNonPerishableFoodDrinkBabyFood]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticNonPerishableFoodDrinkEnergyDrinks]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticOtherFoilSurvivalBlankets]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticOtherThermalClothingNew]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticOtherSleepingBags]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticOtherLargeOrMediumBackpacks]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticOtherPowerBanksAndChargingCables]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticOtherTorches]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticOtherElectricityGenerators]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticOtherBootDriers]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticOtherHotWaterBottles]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticOtherInsulatedFlasks]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticOtherDisposableTableware]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticOtherCookingStoves]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticOtherBinBags]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.DomesticOtherOther]: defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentPatientMonitor]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentAnaesthesiaMachine]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentECGRecorder]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentDefibrillator]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSyringePump]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentInfusionPump]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentExaminationLightLed]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentFootOperatedSuctionPump]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentPatientVentilator]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentMobileUltrasoundScanner]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSelfInflatingBagSet]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentCapnometer]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentXRayUnit]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentSurgicalDrill]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentDermatome]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentLegTractionSplint]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesMedicalEquipmentOther]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesMedicalTourniquets]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesFirstAidKits]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesViralBacteriaFilter]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesCentralVenousCatheters]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetIntraosseousInfusionKit]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetInfusionAdult]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSetInfusionPaediatric]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesDrainThoracicInsertionSet]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesInsulinSyringes]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesSyringePensDiabetics]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesGlucometers]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesXRayCartridges]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesConsumablesOther]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsBasicSurgery]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDressing]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsCraniotomy]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsLaparotomyAndCaesarean]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDPCSuture]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsDebridement]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsSkinGraft]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsFinePaediatrics]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetGeneralSurgeryInstrumentsThoracotomyComplementary]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsAmputation]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgery]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBasicBoneSurgeryCurettes]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsBoneWiringAndKirshner]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsPlasterCastsRemoval]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetOrthoSurgeryInstrumentsTractionPlusTenBows]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsSetExternalFixationLargeFixatorsAndInstruments]:
      defaultPpeRequestTypeSubForm,
    [PpeTypeEnum.NonDrugMedicalSuppliesSurgicalInstrumentsAndFixatorsOther]:
      defaultPpeRequestTypeSubForm,
  },
};

export const ORG_TYPES: { value: string; name: MessageID }[] = [
  { value: 'LocalCharity', name: 'organisation_type_local_charity' },
  {
    value: 'InternationalOrgChapter',
    name: 'organisation_type_international_org_chapter',
  },
  {
    value: 'ReligiousInstitution',
    name: 'organisation_type_religious_institution',
  },
  {
    value: 'LocalOrRegionalAdmin',
    name: 'organisation_type_local_or_regional_admin',
  },
  { value: 'University', name: 'organisation_type_university' },
  { value: 'School', name: 'organisation_type_school' },
  { value: 'Community', name: 'organisation_type_community' },
  { value: 'LocalHospital', name: 'organisation_type_local_hospital' },
  { value: 'DistributionHub', name: 'organisation_type_distribution' },
  { value: 'Other', name: 'organisation_type_other' },
];
