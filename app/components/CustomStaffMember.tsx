import {
  StaffRole,
  ModeOfWork,
  StaffMemberDetails,
} from "@/types/ClientRequest";
import {
  FormControl,
  FormLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { IconTrash } from "@tabler/icons-react";

interface CustomStaffMemberProps {
  staffDetails: StaffMemberDetails;
  setStaffDetails: (details: StaffMemberDetails) => void;
  number: number;
  deleteStaffMember?: () => void;
}

const CustomStaffMember = ({
  setStaffDetails,
  staffDetails,
  number,
  deleteStaffMember,
}: CustomStaffMemberProps) => {
  return (
    <div
      className="p-6 rounded-lg mt-4 relative bg-gradient-to-b from-luxury-ivory to-luxury-champagne border-luxury-champagne border"
      
    >
      {deleteStaffMember && (
        <IconTrash
          onClick={deleteStaffMember}
          stroke={2}
          className="absolute top-3 right-3 text-stone-700"
        />
      )}
      <FormControl fullWidth sx={{ mt: 3 }}>
        <FormLabel id="demo2-simple-select-label">
          Select Addition Staff Member {number}
        </FormLabel>
        <Select
          displayEmpty
          labelId="demo2-simple-select-label"
          id="demo-simple-select"
          value={staffDetails.staffMemberRole}
          required
          onChange={(event: SelectChangeEvent) => {
            setStaffDetails({
              ...staffDetails,
              staffMemberRole: event.target.value as StaffRole,
            });
          }}
        >
          <MenuItem value="Nanny">Childcare Professional</MenuItem>
          <MenuItem value="Chef">Private Chef</MenuItem>
          <MenuItem value="Housekeeper">Professional Housekeeper</MenuItem>
          <MenuItem value="Driver">Executive Chaffeur/Driver</MenuItem>
          <MenuItem value="House Attendant/Help">House Attendant/Help</MenuItem>
          <MenuItem value="Personal Assistant">Personal Assistant</MenuItem>
        </Select>
      </FormControl>

      <FormControl className="text-black dark:text-gray-900" sx={{ mt: 2 }}>
        <FormLabel>Accomodation Preference</FormLabel>
        <RadioGroup
          row
          // aria-labelledby="demo-radio-buttons-group-label"
          // defaultValue="Live-out"
          value={staffDetails.accomodationPreference}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setStaffDetails({
              ...staffDetails,
              accomodationPreference: event.target.value as ModeOfWork,
            });
          }}
        >
          <FormControlLabel
            value="Live-in"
            control={<Radio />}
            label="Live-in"
          />

          <FormControlLabel
            value="Live-out"
            control={<Radio />}
            label="Live-out"
          />
        </RadioGroup>
      </FormControl>

      <FormControl className="text-black dark:text-gray-900" sx={{ mt: 2 }}>
        <FormLabel id="gender-radio-buttons-group-label">
          Gender Preference
        </FormLabel>
        <RadioGroup
          row
          aria-labelledby="gender-radio-buttons-group-label"
          value={staffDetails.genderPreference}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setStaffDetails({
              ...staffDetails,
              genderPreference: event.target.value,
            });
          }}
        >
          <FormControlLabel value="Female" control={<Radio />} label="Female" />
          <FormControlLabel value="Male" control={<Radio />} label="Male" />
          <FormControlLabel
            value="Any Gender"
            control={<Radio />}
            label="Any Gender"
          />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel className="mt-2" id="gender-radio-buttons-group-label">
          Additional Details or Special Requirements
        </FormLabel>
        <TextField
          value={staffDetails.otherPreferences}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setStaffDetails({
              ...staffDetails,
              otherPreferences: event.target.value,
            });
          }}
          fullWidth
          sx={{ mt: 2 }}
          placeholder="Any specific requirements, preferences, or notes for this staff member..."
          multiline
          rows={4}
        />
      </FormControl>
    </div>
  );
};

export default CustomStaffMember;
