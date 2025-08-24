import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  Box,
  Paper,
  IconButton,
  InputAdornment,
  Snackbar,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const schema = yup.object().shape({
  time: yup.string().required("Thời gian không được bỏ trống"),
  quantity: yup
    .number()
    .typeError("Phải nhập số")
    .moreThan(0.01, "Số lượng phải > 0")
    .required("Số lượng không được bỏ trống"),
  pump: yup.string().required("Trụ không được bỏ trống"),
  revenue: yup
    .number()
    .typeError("Phải nhập số")
    .moreThan(0, "Doanh thu phải > 0")
    .required("Doanh thu không được bỏ trống"),
  unitPrice: yup
    .number()
    .typeError("Phải nhập số")
    .moreThan(0, "Đơn giá phải > 0")
    .required("Đơn giá không được bỏ trống"),
});


function FormField({ label, children }) {
  return (
    <Box sx={{ position: "relative", mb: 3 }}>
      <Typography
        sx={{
          position: "absolute",
          top: 8,
          left: 12,
          fontSize: 12,
          color: "gray",
          pointerEvents: "none",
          backgroundColor: "white",
        }}
      >
        {label}
      </Typography>
      {children}
    </Box>
  );
}

export default function App() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      time: "",
      quantity: "",
      pump: "",
      revenue: "",
      unitPrice: "",
    },
  });

  const timePickerRef = useRef(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const picker = flatpickr(timePickerRef.current, {
      enableTime: true,
      enableSeconds: true,
      dateFormat: "d/m/Y H:i:S",
      time_24hr: true,
      onChange: (selectedDates, dateStr) => {
        setValue("time", dateStr, { shouldValidate: true });
      },
    });
    return () => picker.destroy();
  }, [setValue]);

  const onSubmit = (data) => {
    console.log("Form data:", data);
    setOpenSnackbar(true);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      {/* Header */}
      <Box mb={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center">
            <IconButton>
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="body1">Đóng</Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3 }}
            onClick={handleSubmit(onSubmit)}
          >
            Cập nhật
          </Button>
        </Box>
        <Typography variant="h4" fontWeight="bold">
          Nhập giao dịch
        </Typography>
      </Box>

      {/* Form */}
      <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Thời gian */}
          <FormField label="Thời gian">
            <TextField
              fullWidth
              variant="outlined"
              inputRef={timePickerRef}
              {...register("time")}
              error={!!errors.time}
              helperText={errors.time?.message}
              slotProps={{
                input: { sx: { pt: "10px" } },
                endAdornment: (
                  <InputAdornment position="end">
                    <CalendarTodayIcon />
                  </InputAdornment>
                ),
                readOnly: true,
              }}
            />
          </FormField>

          {/* Số lượng */}
          <FormField label="Số lượng">
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              {...register("quantity")}
              error={!!errors.quantity}
              helperText={errors.quantity?.message}
              slotProps={{ input: { sx: { pt: "10px" } } }}
            />
          </FormField>

          {/* Trụ */}
          <FormField label="Trụ">
            <Select
              fullWidth
              displayEmpty
              defaultValue=""
              {...register("pump")}
              error={!!errors.pump}
              sx={{
                mt: 0,
                "& .MuiSelect-select": { pt: "18px" },
              }}
            >
              <MenuItem value="" disabled></MenuItem>
              <MenuItem value="1">Trụ 1</MenuItem>
              <MenuItem value="2">Trụ 2</MenuItem>
              <MenuItem value="3">Trụ 3</MenuItem>
            </Select>
            {errors.pump && (
              <Typography variant="caption" color="error">
                {errors.pump.message}
              </Typography>
            )}
          </FormField>

          {/* Doanh thu */}
          <FormField label="Doanh thu">
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              {...register("revenue")}
              error={!!errors.revenue}
              helperText={errors.revenue?.message}
              slotProps={{ input: { sx: { pt: "10px" } } }}
            />
          </FormField>

          {/* Đơn giá */}
          <FormField label="Đơn giá">
            <TextField
              fullWidth
              variant="outlined"
              type="text"
              {...register("unitPrice")}
              error={!!errors.unitPrice}
              helperText={errors.unitPrice?.message}
              slotProps={{ input: { sx: { pt: "10px" } } }}
            />
          </FormField>
        </form>
      </Paper>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Nhập thành công"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Container>
  );
}
