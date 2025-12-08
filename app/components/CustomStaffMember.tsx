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
  ListItemText,
  FormHelperText,
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
    <div className="p-6 rounded-lg mt-4 relative bg-gradient-to-b from-luxury-ivory to-luxury-champagne border-luxury-champagne border">
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
          <MenuItem value="Nanny">
            <div className="w-full h-fit flex flex-col">
              <ListItemText primary="Childcare Professional" />
              <p className="text-sm text-gray-600 text-wrap">
                Warm, highly trained nanny dedicated to nurturing your children with structure, compassion, and refined family etiquette.
              </p>
            </div>
          </MenuItem>
          <MenuItem value="Chef">
            <div>
              <ListItemText primary="Private Chef" />
              <p className="text-sm text-gray-600  text-wrap">
                Skilled culinary professional who prepares personalized meals—beautifully plated, nutritious, and tailored to your family’s tastes
              </p>
            </div>
          </MenuItem>
          <MenuItem value="Housekeeper">
            <div>
              <ListItemText primary="Professional Housekeeper" />
              <p className="text-sm text-gray-600  text-wrap">
                Meticulous housekeeper who maintains an immaculate, orderly, and
                elegantly presented home environment every day.
              </p>
            </div>
          </MenuItem>
          <MenuItem value="Driver">
            <div>
              <ListItemText primary="Private Driver" />
              <p className="text-sm text-gray-600  text-wrap">
                Reliable, well-groomed driver ensuring safe, punctual, and
                discreet transportation for your family.
              </p>
            </div>
          </MenuItem>
          <MenuItem value="House Assistant">
            <div>
              <ListItemText primary="Home Assistant" />
              <p className="text-sm text-gray-600  text-wrap">
                Versatile home support professional handling daily tasks,
                errands, and household duties to keep your home running
                smoothly.
              </p>
            </div>
          </MenuItem>
          <MenuItem value="Personal Assistant">
            <div>
              <ListItemText primary="Personal Assistant" />
              <p className="text-sm text-gray-600  text-wrap">
                Polished personal aide who helps manage schedules, errands,
                communication, and daily coordination with exceptional
                professionalism.
              </p>
            </div>
          </MenuItem>
          <MenuItem value="Laundry Attendant">
            <div>
              <ListItemText primary="Laundry Attendant" />
              <p className="text-sm text-gray-600  text-wrap">
                Dedicated laundry specialist who ensures all clothing, linens,
                and fabrics are properly washed, pressed, folded, and
                beautifully organized.
              </p>
            </div>
          </MenuItem>
          <MenuItem value="Security Assistant">
            <div>
              <ListItemText primary="Security Assistant" />
              <p className="text-sm text-gray-600  text-wrap">
                Vigilant support personnel focused on monitoring safety
                routines, access points, and general household security
                requirements.
              </p>
            </div>
          </MenuItem>
          <MenuItem value="Gardener">
            <div>
              <ListItemText primary="Gardener" />
              <p className="text-sm text-gray-600  text-wrap">
                Skilled gardener who keeps your outdoor spaces flourishing,
                tidy, and beautifully maintained throughout the year.
              </p>
            </div>
          </MenuItem>
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
        <FormHelperText>
          NB: Working schedule for live-out staff are Mondays to Fridays (8am -
          5pm)
        </FormHelperText>
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
