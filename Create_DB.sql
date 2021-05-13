
-- Delete existing LOG table
drop table if exists log;

-- Create LOG table
create table log(
    date_time integer not null unique,
    URL_request text not null,
    status_code integer not null,
    status_message text not null,
    primary key (date_time)
) without rowid; 

-- Drop existing OBSERVATIONS table
drop table if exists observations;

-- Create OBSERVATIONS table
create table observations(
    country text,
    epoch integer,
    humidity numeric,
    lat numeric,
    lon numeric,
    neighborhood text,
    obsTimeLocal text,
    obsTimeUtc text,
    qcStatus integer,
    realtimeFrequency numeric,
    softwareType text,
    solarRadiation numeric,
    stationID text,
    uv numeric,
    winddir numeric,
    dewpt numeric,
    elev numeric,
    heatindex numeric,
    precipRate numeric,
    precipTotal numeric,
    pressure numeric,
    temp numeric,
    windChill numeric,
    windGust numeric,
    windSpeed numeric,
    primary key (obsTimeLocal)
) without rowid;

