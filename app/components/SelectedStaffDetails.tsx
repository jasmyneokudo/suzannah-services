type SelectedStaffDetailsProps = {
  staffMemberRole: string;
  accomodationPreference: string;
  genderPreference: string;
  otherPreferences: string;
};

const SelectedStaffDetails = ({
  staffMemberRole,
  accomodationPreference,
  genderPreference,
  otherPreferences,
}: SelectedStaffDetailsProps) => {
  return (
    <div className="mb-3 border-l-2 border-blue-600/40 pl-3">
      <p className="font-medium">{staffMemberRole}</p>
      <p className="text-gray-600 text-sm">
        {accomodationPreference} • {genderPreference}
      </p>
      <p className="text-gray-600 text-sm">Note: {otherPreferences}</p>
    </div>
  );
};

export default SelectedStaffDetails;
