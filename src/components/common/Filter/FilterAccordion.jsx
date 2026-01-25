import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";

export default function FilterAccordion({ title, options }) {
  return (
    <Accordion defaultExpanded elevation={0} sx={{ width: "100%" }}>

      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          borderBottom: "1px solid #ddd",
          px: 0,
          bgcolor: '#F9FAFB'
        }}
      >
        <Typography font_tfWeight="600">{title}</Typography>
      </AccordionSummary>

      <AccordionDetails sx={{ px: 0, bgcolor: '#F9FAFB' }}>

        <Box display="flex" flexDirection="column" gap={0.5}>

          {options.map((item) => (
            <FormControlLabel
              key={item}
              control={<Checkbox size="small" />}
              label={item}
            />
          ))}

          <Typography
            sx={{
              color: "#1976d2",
              fontSize: "14px",
              cursor: "pointer",
              mt: 1,
            }}
          >
            See all
          </Typography>

        </Box>

      </AccordionDetails>
    </Accordion>
  );
}
