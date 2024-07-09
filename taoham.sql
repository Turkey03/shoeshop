use QLSV_Nhom10;
go
--1. Hàm: Lấy tên khoa theo mã khoa
CREATE FUNCTION GetTenKhoa(@MaKhoa INT)
RETURNS NVARCHAR(50)
AS
BEGIN
    DECLARE @TenKhoa NVARCHAR(50);
    SELECT @TenKhoa = TenKhoa FROM Khoa WHERE MaKhoa = @MaKhoa;
    RETURN @TenKhoa;
END;
GO
--2. Hàm: Lấy tên lớp theo mã lớp
CREATE FUNCTION GetTenLop(@MaLop INT)
RETURNS NVARCHAR(50)
AS
BEGIN
    DECLARE @TenLop NVARCHAR(50);
    SELECT @TenLop = TenLop FROM Lop WHERE MaLop = @MaLop;
    RETURN @TenLop;
END;
GO

--3. Hàm: Lấy tên sinh viên theo mã sinh viên
CREATE FUNCTION GetTenSinhVien(@MaSV INT)
RETURNS NVARCHAR(30)
AS
BEGIN
    DECLARE @TenSV NVARCHAR(30);
    SELECT @TenSV = TenSV FROM SinhVien WHERE MaSV = @MaSV;
    RETURN @TenSV;
END;
GO
--4. Hàm: Lấy điểm môn học của sinh viên
CREATE FUNCTION GetDiem(@MaSV INT, @MaMH INT)
RETURNS FLOAT
AS
BEGIN
    DECLARE @Diem FLOAT;
    SELECT @Diem = Diem FROM KetQua WHERE MaSV = @MaSV AND MaMH = @MaMH;
    RETURN @Diem;
END;
GO
--5. Hàm: Lấy số tín chỉ của môn học theo mã môn học
CREATE FUNCTION GetSoTinChi(@MaMH INT)
RETURNS INT
AS
BEGIN
    DECLARE @SoTinChi INT;
    SELECT @SoTinChi = SoTinChi FROM MonHoc WHERE MaMH = @MaMH;
    RETURN @SoTinChi;
END;
GO
