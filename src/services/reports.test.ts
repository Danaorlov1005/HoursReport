import reportService from './reports';

describe("service tests", () => {
    test("addReport", () => {
        let employeeRecord = {
            employeeName: "dana",
            startHour:"11/04/2013 04:30:26",
            endHour:"11/04/2013 06:30:26"
        };
        const res = reportService.addReportToDb(employeeRecord);
        expect(res.date).toBe("11/04/2013");
        expect(res.totalHours).toBe(2);
    }),
    test("getDailyByMonth", () => {
        const name = "steve";
        const month = 4;
        let stevesReports = {
            firstReport: {
                employeeName: name,
                startHour:"11/04/2013 04:30:26",
                endHour:"11/04/2013 06:30:26"
            },
            secondReport: {
                employeeName: name,
                startHour:"21/04/2013 07:00:12",
                endHour:"21/04/2013 09:20:26"
            },
            thirdReport: {
                employeeName: name,
                startHour:"17/04/2013 01:30:26",
                endHour:"17/04/2013 06:30:26"
            }
        };
        Object.values(stevesReports).forEach(report => {
            reportService.addReportToDb(report);
        });
        const res = reportService.getDailyEmployeeReportByMonthFromDB(name, month);
        expect(res).toHaveLength(3)
        expect(res).toMatchObject([
            { date: '11/04/2013', totalHours: 2 },
            { date: '21/04/2013', totalHours: 2 },
            { date: '17/04/2013', totalHours: 5 }
          ])
    })
});