import {
  HouseHoldDetails,
} from "@/types/ClientRequest";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  TextField,
} from "@mui/material";

type HouseholdSectionProps = {
  //   requestStage: Number;
  householdDetails: HouseHoldDetails;
  setHouseholdDetails: (req: HouseHoldDetails) => void;
  //   goBack: () => void;
  //   onContinue: () => void;
};

export const HouseholdSection = ({
  householdDetails,
  setHouseholdDetails,
}: HouseholdSectionProps) => {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-bold">Household Details</h2>
      <p className="mt-2 text-sm text-gray-600">
        Getting to know about your kind of household would enable us tailor our
        services to better suit your needs.
      </p>

      <div className="p-6 rounded-lg mt-4 relative bg-gradient-to-b from-luxury-ivory to-luxury-champagne border-luxury-champagne border">
        <FormControl>
          <FormLabel className="mt-2" id="gender-radio-buttons-group-label">
            What kind of building is your household located in?
          </FormLabel>
          <TextField
            value={householdDetails.buildingDescription}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setHouseholdDetails({
                ...householdDetails,
                buildingDescription: event.target.value,
              });
            }}
            fullWidth
            sx={{ mt: 2 }}
            placeholder="Describe your building (e.g., 2-storey Duplex with 5 bedrooms and 7 bathrooms)"
            multiline
            rows={3}
          />
          <FormHelperText>
            E.g: 2-storey Duplex with 5 bedrooms and 7 batrooms
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel className="mt-2" id="gender-radio-buttons-group-label">
            How many people live in your household?
          </FormLabel>
          <TextField
            value={householdDetails.numberOfHouseholdOccupants}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setHouseholdDetails({
                ...householdDetails,
                numberOfHouseholdOccupants: Number(event.target.value),
              });
            }}
            fullWidth
            sx={{ mt: 2 }}
            placeholder="Total number of people in your home."
            type="number"
          />
        </FormControl>

        <FormControl>
          <FormLabel className="mt-3" id="gender-radio-buttons-group-label">
        Any kids in the household? If yes, please provide details.
          </FormLabel>
          <TextField
            value={householdDetails.kidsDetails}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setHouseholdDetails({
                ...householdDetails,
                kidsDetails: event.target.value,
              });
            }}
            fullWidth
            sx={{ mt: 2 }}
            placeholder="Details about kids in the household"
            multiline
            rows={3}
          />
          <FormHelperText>
            E.g: 2 kids, ages 4 and 7, both in primary school
          </FormHelperText>
        </FormControl>

        <FormControl>
          <FormLabel className="mt-2" id="gender-radio-buttons-group-label">
            Any pets? If yes, please provide details.
          </FormLabel>
          <TextField
            value={householdDetails.petDetails}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setHouseholdDetails({
                ...householdDetails,
                petDetails: event.target.value,
              });
            }}
            fullWidth
            sx={{ mt: 2 }}
            placeholder="Details about pets in the household"
            multiline
            rows={2}
          />
        </FormControl>

        <FormControl>
          <FormLabel className="mt-2" id="gender-radio-buttons-group-label">
            Any other relevant information about your household?
          </FormLabel>
          <TextField
            value={householdDetails.otherInformation}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setHouseholdDetails({
                ...householdDetails,
                otherInformation: event.target.value,
              });
            }}
            fullWidth
            sx={{ mt: 2 }}
            placeholder="Enter any other relevant information about your household. e,g Values, Religion e.t.c"
            multiline
            rows={3}
          />
        </FormControl>
      </div>
    </div>
  );
};
