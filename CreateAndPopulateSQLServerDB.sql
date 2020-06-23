USE [master]
GO
/****** Object:  Database [DeviceManager]    Script Date: 23/06/2020 12:51:06 PM ******/
CREATE DATABASE [DeviceManager]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Devices', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\Devices.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Devices_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL14.SQLEXPRESS\MSSQL\DATA\Devices_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [DeviceManager] SET COMPATIBILITY_LEVEL = 140
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [DeviceManager].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [DeviceManager] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [DeviceManager] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [DeviceManager] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [DeviceManager] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [DeviceManager] SET ARITHABORT OFF 
GO
ALTER DATABASE [DeviceManager] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [DeviceManager] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [DeviceManager] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [DeviceManager] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [DeviceManager] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [DeviceManager] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [DeviceManager] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [DeviceManager] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [DeviceManager] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [DeviceManager] SET  DISABLE_BROKER 
GO
ALTER DATABASE [DeviceManager] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [DeviceManager] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [DeviceManager] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [DeviceManager] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [DeviceManager] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [DeviceManager] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [DeviceManager] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [DeviceManager] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [DeviceManager] SET  MULTI_USER 
GO
ALTER DATABASE [DeviceManager] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [DeviceManager] SET DB_CHAINING OFF 
GO
ALTER DATABASE [DeviceManager] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [DeviceManager] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [DeviceManager] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [DeviceManager] SET QUERY_STORE = OFF
GO
USE [DeviceManager]
GO
/****** Object:  Table [dbo].[Devices]    Script Date: 23/06/2020 12:51:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Devices](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DeviceName] [varchar](20) NOT NULL,
	[Tenant] [int] NULL,
	[DateAdded] [datetime] NULL,
	[SIMCardId] [int] NULL,
 CONSTRAINT [PK_Devices] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[EventLog]    Script Date: 23/06/2020 12:51:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EventLog](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[EventLocation] [nvarchar](100) NULL,
	[LogLevel] [nvarchar](50) NULL,
	[Message] [nvarchar](4000) NULL,
	[CreatedTime] [datetime] NULL,
 CONSTRAINT [PK_EventLog] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[ServiceProviders]    Script Date: 23/06/2020 12:51:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ServiceProviders](
	[Id] [int] NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_ServiceProviders] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SIMCards]    Script Date: 23/06/2020 12:51:06 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SIMCards](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[CCID] [nvarchar](50) NOT NULL,
	[Number] [nvarchar](20) NULL,
	[Activated] [bit] NOT NULL,
	[ServiceProvider] [int] NOT NULL,
 CONSTRAINT [PK_SIMCards] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Devices] ON 
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (2, N'213WPA2019000036', 3, NULL, 11)
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (3, N'213WP2018001488', 3, NULL, 12)
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (4, N'213WP2018001567', 3, NULL, 13)
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (5, N'213WPA2019000008', 3, NULL, 14)
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (6, N'213WPA2019000050', 3, NULL, 15)
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (7, N'213WPA2019000020', 3, NULL, NULL)
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (8, N'213WPA2019000012', 3, NULL, NULL)
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (19, N'352753094547989', 3, NULL, NULL)
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (1019, N'213WPA2019000007', 3, NULL, NULL)
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (1020, N'352753094548003', 3, NULL, NULL)
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (1021, N'213WP2018001055', 3, NULL, NULL)
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (1022, N'123ABC', 3, NULL, NULL)
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (1023, N'ABC123', 3, NULL, NULL)
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (1024, N'efd123', 3, NULL, NULL)
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (1025, N'abc1231421', 3, NULL, NULL)
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (1026, N'359215101824119', 3, NULL, NULL)
GO
INSERT [dbo].[Devices] ([Id], [DeviceName], [Tenant], [DateAdded], [SIMCardId]) VALUES (1027, N'228LE2019000001', 3, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Devices] OFF
GO
INSERT [dbo].[ServiceProviders] ([Id], [Name]) VALUES (1, N'Vodafone')
GO
INSERT [dbo].[ServiceProviders] ([Id], [Name]) VALUES (2, N'Telstra')
GO
SET IDENTITY_INSERT [dbo].[SIMCards] ON 
GO
INSERT [dbo].[SIMCards] ([Id], [CCID], [Number], [Activated], [ServiceProvider]) VALUES (11, N'47134612', N'1', 1, 2)
GO
INSERT [dbo].[SIMCards] ([Id], [CCID], [Number], [Activated], [ServiceProvider]) VALUES (12, N'47134611', N'1', 1, 2)
GO
INSERT [dbo].[SIMCards] ([Id], [CCID], [Number], [Activated], [ServiceProvider]) VALUES (13, N'47134551', N'1', 1, 2)
GO
INSERT [dbo].[SIMCards] ([Id], [CCID], [Number], [Activated], [ServiceProvider]) VALUES (14, N'471346023N', N'1', 1, 2)
GO
INSERT [dbo].[SIMCards] ([Id], [CCID], [Number], [Activated], [ServiceProvider]) VALUES (15, N'47134587N', N'1', 1, 2)
GO
SET IDENTITY_INSERT [dbo].[SIMCards] OFF
GO
ALTER TABLE [dbo].[Devices]  WITH CHECK ADD  CONSTRAINT [FK_Devices_SIMCards] FOREIGN KEY([SIMCardId])
REFERENCES [dbo].[SIMCards] ([Id])
GO
ALTER TABLE [dbo].[Devices] CHECK CONSTRAINT [FK_Devices_SIMCards]
GO
ALTER TABLE [dbo].[SIMCards]  WITH CHECK ADD  CONSTRAINT [FK_SIMCards_ServiceProviders] FOREIGN KEY([ServiceProvider])
REFERENCES [dbo].[ServiceProviders] ([Id])
GO
ALTER TABLE [dbo].[SIMCards] CHECK CONSTRAINT [FK_SIMCards_ServiceProviders]
GO
USE [master]
GO
ALTER DATABASE [DeviceManager] SET  READ_WRITE 
GO
