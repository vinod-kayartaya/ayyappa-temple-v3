package com.cyblore.service;

import com.cyblore.dto.RevenueReportDTO;
import com.cyblore.dto.MonthlyRevenueReportDTO;
import com.cyblore.dto.UserwiseRevenueReportDTO;
import com.cyblore.repository.OfferingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final OfferingRepository offeringRepository;

    public List<RevenueReportDTO> generateRevenueReport(LocalDate fromDate, LocalDate toDate) {
        // If dates are not provided, use current date
        LocalDate effectiveFromDate = fromDate != null ? fromDate : LocalDate.now();
        LocalDate effectiveToDate = toDate != null ? toDate : LocalDate.now();

        List<Object[]> results = offeringRepository.findDailyRevenue(effectiveFromDate, effectiveToDate);
        
        return results.stream()
            .map(row -> {
                RevenueReportDTO dto = new RevenueReportDTO();
                dto.setDate((LocalDate) row[0]);
                dto.setOfferingType((String) row[1]);
                dto.setTotalCount(((Number) row[2]).intValue());
                dto.setTotalAmount(((Number) row[3]).doubleValue());
                return dto;
            })
            .collect(Collectors.toList());
    }

    public List<MonthlyRevenueReportDTO> generateMonthlyReport(Integer year) {
        List<Object[]> results = offeringRepository.findMonthlyRevenue(year);
        
        return results.stream()
            .map(row -> {
                MonthlyRevenueReportDTO dto = new MonthlyRevenueReportDTO();
                dto.setMonthYear((String) row[0]);
                dto.setOfferingType((String) row[1]);
                dto.setTotalCount(((Number) row[2]).intValue());
                dto.setTotalAmount(((Number) row[3]).doubleValue());
                return dto;
            })
            .collect(Collectors.toList());
    }

    public List<UserwiseRevenueReportDTO> generateUserwiseReport(LocalDate fromDate, LocalDate toDate) {
        // If dates are not provided, use current date
        LocalDate effectiveFromDate = fromDate != null ? fromDate : LocalDate.now();
        LocalDate effectiveToDate = toDate != null ? toDate : LocalDate.now();

        List<Object[]> results = offeringRepository.findUserwiseRevenue(effectiveFromDate, effectiveToDate);
        
        return results.stream()
            .map(row -> {
                UserwiseRevenueReportDTO dto = new UserwiseRevenueReportDTO();
                dto.setUser((String) row[0]);
                dto.setDate((LocalDate) row[1]);
                dto.setBillNo((Long) row[2]);
                dto.setTotalAmount(((Number) row[3]).doubleValue());
                return dto;
            })
            .collect(Collectors.toList());
    }
} 