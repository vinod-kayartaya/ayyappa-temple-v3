package com.cyblore.controller;

import com.cyblore.dto.RevenueReportDTO;
import com.cyblore.dto.MonthlyRevenueReportDTO;
import com.cyblore.dto.UserwiseRevenueReportDTO;
import com.cyblore.service.ReportService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
        log.info("ReportController initialized with reportService: {}", reportService);
    }

    @GetMapping("/revenue")
    public ResponseEntity<List<RevenueReportDTO>> getRevenueReport(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate) {

        log.debug("Request received for revenue report");
        log.info("Generating revenue report - fromDate: {}, toDate: {}",
                fromDate != null ? fromDate : "today",
                toDate != null ? toDate : "today");

        try {
            List<RevenueReportDTO> report = reportService.generateRevenueReport(fromDate, toDate);
            log.info("Revenue report generated successfully with {} entries", report.size());
            return ResponseEntity.ok(report);
        } catch (Exception e) {
            log.error("Error generating revenue report: {}", e.getMessage(), e);
            throw e;
        }
    }

    @GetMapping("/revenue/monthly/{year}")
    public ResponseEntity<List<MonthlyRevenueReportDTO>> getMonthlyRevenueReport(
            @PathVariable Integer year) {

        log.debug("Request received for monthly revenue report");
        log.info("Generating monthly revenue report for year: {}", year);

        try {
            List<MonthlyRevenueReportDTO> report = reportService.generateMonthlyReport(year);
            log.info("Monthly revenue report generated successfully with {} entries", report.size());
            return ResponseEntity.ok(report);
        } catch (Exception e) {
            log.error("Error generating monthly revenue report: {}", e.getMessage(), e);
            throw e;
        }
    }

    @GetMapping("/revenue/userwise")
    public ResponseEntity<List<UserwiseRevenueReportDTO>> getUserwiseRevenueReport(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate fromDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate toDate) {

        log.debug("Request received for userwise revenue report");
        log.info("Generating userwise revenue report - fromDate: {}, toDate: {}",
                fromDate != null ? fromDate : "today",
                toDate != null ? toDate : "today");

        try {
            List<UserwiseRevenueReportDTO> report = reportService.generateUserwiseReport(fromDate, toDate);
            log.info("Userwise revenue report generated successfully with {} entries", report.size());
            return ResponseEntity.ok(report);
        } catch (Exception e) {
            log.error("Error generating userwise revenue report: {}", e.getMessage(), e);
            throw e;
        }
    }
}