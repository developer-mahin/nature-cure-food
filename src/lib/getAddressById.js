import {
  getAllDistrict,
  getAllDivision,
  getAllUnion,
  getAllUpazila,
} from "bd-divisions-to-unions";

export const getFullAddressFromIds = (
  addressIds,
  road = "",
  language = "en"
) => {
  // Handle null or undefined addressIds
  if (!addressIds) {
    return road || "";
  }

  const divisionsData = getAllDivision(language);
  const districtsData = getAllDistrict(language);
  const upazilasData = getAllUpazila(language);
  const unionsData = getAllUnion(language);

  // Normalize incoming ids to strings to avoid number vs string mismatches
  const divId = String(addressIds.division ?? "");
  const distId = String(addressIds.district ?? "");
  const upaId = String(addressIds.upazila ?? "");
  const uniId = String(addressIds.union ?? "");

  const divisionName =
    divisionsData.find((d) => String(d.value) === divId)?.title || "";

  // If division is not provided, search all divisions for the district
  let districtName = "";
  if (divId && districtsData[divId]) {
    districtName =
      districtsData[divId].find((d) => String(d.value) === distId)?.title || "";
  } else if (distId) {
    // Search across all divisions
    for (const divisionId in districtsData) {
      const found = districtsData[divisionId].find(
        (d) => String(d.value) === distId
      );
      if (found) {
        districtName = found.title;
        break;
      }
    }
  }

  const upazilaName =
    (upazilasData[distId] || []).find((u) => String(u.value) === upaId)
      ?.title || "";
  const unionName =
    (unionsData[upaId] || []).find((u) => String(u.value) === uniId)?.title ||
    "";

  // Build address string: Road, Union, Upazila, District, Division
  // const addressParts = [
  //   districtName,
  //   unionName,
  //   upazilaName,
  //   road,
  //   divisionName,
  // ].filter(Boolean);

  const addressParts = [road, upazilaName, districtName, unionName].filter(
    Boolean
  );

  return addressParts.join(", ");
};

// Helper function to get address details with names
export const getAddressDetails = (addressIds, language = "en") => {
  if (!addressIds) {
    return {
      division: { id: "", name: "" },
      district: { id: "", name: "" },
      upazila: { id: "", name: "" },
      union: { id: "", name: "" },
    };
  }

  const divisionsData = getAllDivision(language);
  const districtsData = getAllDistrict(language);
  const upazilasData = getAllUpazila(language);
  const unionsData = getAllUnion(language);

  const divId = String(addressIds.division ?? "");
  const distId = String(addressIds.district ?? "");
  const upaId = String(addressIds.upazila ?? "");
  const uniId = String(addressIds.union ?? "");

  const divisionName =
    divisionsData.find((d) => String(d.value) === divId)?.title || "";

  // If division is not provided, search all divisions for the district
  let districtName = "";
  if (divId && districtsData[divId]) {
    districtName =
      districtsData[divId].find((d) => String(d.value) === distId)?.title || "";
  } else if (distId) {
    // Search across all divisions
    for (const divisionId in districtsData) {
      const found = districtsData[divisionId].find(
        (d) => String(d.value) === distId
      );
      if (found) {
        districtName = found.title;
        break;
      }
    }
  }

  const upazilaName =
    (upazilasData[distId] || []).find((u) => String(u.value) === upaId)
      ?.title || "";
  const unionName =
    (unionsData[upaId] || []).find((u) => String(u.value) === uniId)?.title ||
    "";

  return {
    division: { id: divId, name: divisionName },
    district: { id: distId, name: districtName },
    upazila: { id: upaId, name: upazilaName },
    union: { id: uniId, name: unionName },
  };
};
