const express = require('express');
const router = express.Router();
const counter = require('../util/counter');

const adodb = require('node-adodb');
const connection = adodb.open('Provider=Microsoft.ACE.OLEDB.12.0;Data Source=./NOCDatabase.accdb;Persist Security Info=False');
adodb.debug = true;

const JanQuery = '#2020-01-01# and #2020-01-31#';
const FebQuery = '#2020-02-01# and #2020-02-28#';
const MarchQuery = '#2020-03-01# and #2020-03-31#';
const AprilQuery = '#2020-04-01# and #2020-04-30#';
const MayQuery = '#2020-05-01# and #2020-05-31#';
const JuneQuery = '#2020-06-01# and #2020-06-30#';
const JulyQuery = '#2020-07-01# and #2020-07-31#';
const AugustQuery = '#2020-08-01# and #2020-08-31#';
const SeptemberQuery = '#2020-09-01# and #2020-09-30#';
const OctoberQuery = '#2020-10-01# and #2020-10-31#';
const NovemberQuery = '#2020-11-01# and #2020-11-30#';
const DecemberQuery = '#2020-12-01# and #2020-12-31#';

// const queryString = `SELECT * FROM January where Datestamp between #2020-01-01# and #2020-01-31#`;
let queryString = `SELECT * FROM January where Datestamp between ${JanQuery}`;
const queryTotal = `SELECT * FROM January`;
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// .query(queryTotal)
// .then(tot => {
//     ytd=tot.length;
// })

let ytd = 0;
let ytdmails = 0;
let ytdcalls = 0;
let ytdself = 0;
let ytdremoteResolved = 0;
let ytdnoremoteResolved = 0;
let ytdremoteCallout = 0;
let ytdnoremoteCallout = 0;

let d = new Date();
let n = d.getMonth()+1;
let month;
let k;

const decide = (mm) => {
    if(mm == 1) {
        queryString = `SELECT * FROM January where Datestamp between ${JanQuery}`;
        month = "January";
    }
    else if(mm == 2) {
        queryString = `SELECT * FROM January where Datestamp between ${FebQuery}`;
        month = "February";
    }
    else if(mm == 3) {
        queryString = `SELECT * FROM January where Datestamp between ${MarchQuery}`;
        month = "March";
    }
    else if(mm == 4) {
        queryString = `SELECT * FROM January where Datestamp between ${AprilQuery}`;
        month = "April";
    }
    else if(mm == 5) {
        queryString = `SELECT * FROM January where Datestamp between ${MayQuery}`;
        month = "May";
    }
    else if(mm == 6) {
        queryString = `SELECT * FROM January where Datestamp between ${JuneQuery}`;
        month = "June";
    }
    else if(mm == 7) {
        queryString = `SELECT * FROM January where Datestamp between ${JulyQuery}`;
        month = "July";
    }
    else if(mm == 8) {
        queryString = `SELECT * FROM January where Datestamp between ${AugustQuery}`;
        month = "August";
    }
    else if(mm == 9) {
        queryString = `SELECT * FROM January where Datestamp between ${SeptemberQuery}`;
        month = "September";
    }
    else if(mm == 10) {
        queryString = `SELECT * FROM January where Datestamp between ${OctoberQuery}`;
        month = "October";
    }
    else if(mm == 11) {
        queryString = `SELECT * FROM January where Datestamp between ${NovemberQuery}`;
        month = "November";
    }
    else if(mm == 12) {
        queryString = `SELECT * FROM January where Datestamp between ${DecemberQuery}`;
        month = "December";
    }
    else if(mm == 13) {
        queryString = `SELECT * FROM January`;
        month = "Year To Date";
    }
}

exports.connect = (req, res, next) => {
    // console.log(req.query.month);
    if(!req.query.month) {
        k = n;
    }
    else {
        k = req.query.month;
    }
    decide(k);
    connection
        .query(queryTotal)
        .then(tot => {
            ytd = 0;
            ytdmails = 0;
            ytdcalls = 0;
            ytdremoteResolved = 0;
            ytdnoremoteResolved = 0;
            ytdremoteCallout = 0;
            ytdnoremoteCallout = 0;
            ytdself = 0;
            ytd=tot.length-1;
            for (let part of tot) {
                if(part.GeneratedBy == 'Email') {
                    if (part.RemoteConnection) {
                        if(part.ClosedStatus == 'Remote Resolution') {
                            ytdmails++;
                            ytdremoteResolved++;
                        }
                        else {
                            ytdmails++;
                            ytdremoteCallout++;
                        }  
                    } else {
                        if(part.ClosedStatus == 'Remote Resolution') {
                            ytdmails++;
                            ytdnoremoteResolved++;
                        }
                        else {
                            ytdmails++;
                            ytdnoremoteCallout++;
                        } 
                    }
                }
                else if (part.GeneratedBy == 'Phone') {
                    if (part.RemoteConnection) {
                        if(part.ClosedStatus == 'Remote Resolution') {
                            ytdcalls++;
                            ytdremoteResolved++;
                        }
                        else {
                            ytdcalls++;
                            ytdremoteCallout++;
                        } 
                    } else {
                        if(part.ClosedStatus == 'Remote Resolution') {
                            ytdcalls++;
                            ytdnoremoteResolved++;
                        }
                        else {
                            if(part.ClosedStatus == 'Remote Resolution') {
                                ytdcalls++;
                                ytdnoremoteResolved++;
                            }
                            else {
                                ytdcalls++;
                                ytdnoremoteCallout++;
                            } 
                        } 
                    }
                }
                else if (part.GeneratedBy == 'Bureau') {
                    if (part.RemoteConnection) {
                        if(part.ClosedStatus == 'Remote Resolution') {
                            ytdself++;
                            ytdremoteResolved++;
                        }
                        else {
                            ytdself++;
                            ytdremoteCallout++;
                        } 
                    } else {
                        if(part.ClosedStatus == 'Remote Resolution') {
                            ytdself++;
                            ytdnoremoteResolved++;
                        }
                        else {
                            if(part.ClosedStatus == 'Remote Resolution') {
                                ytdself++;
                                ytdnoremoteResolved++;
                            }
                            else {
                                ytdself++;
                                ytdnoremoteCallout++;
                            } 
                        } 
                    }
                }
            }
        })
        .catch(e => console.log(e));

    connection
        .query(queryString)                
        .then(data => {
            const totalmonth = new counter;
            totalmonth.initialize();
            const southeast = new counter;
            southeast.initialize();
            const southwest = new counter;
            southwest.initialize();
            const london = new counter;
            london.initialize();
            const eastmids = new counter;
            eastmids.initialize();
            const westmids = new counter;
            westmids.initialize();
            const northeast = new counter;
            northeast.initialize();
            const northwest = new counter;
            northwest.initialize();
            const scotland = new counter;
            scotland.initialize();
            for (let datachunk of data) {
                if(datachunk.Region === 'South East') {
                    if (datachunk.GeneratedBy == 'Email') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                southeast.emailP++;
                                southeast.remoteResolved++;
                                southeast.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.emailP++;
                            } else {
                                southeast.emailP++;
                                southeast.remoteCallout++;
                                southeast.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.emailP++;
                            } 
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                southeast.emailP++;
                                southeast.noremoteResolved++;
                                southeast.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.emailP++;
                            }else {
                                southeast.emailP++;
                                southeast.noremoteCallout++;
                                southeast.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.emailP++;
                            }
                        }
                    } else if (datachunk.GeneratedBy == 'Phone') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                southeast.phoneP++;
                                southeast.remoteResolved++;
                                southeast.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.phoneP++;
                            } else {
                                southeast.phoneP++;
                                southeast.remoteCallout++;
                                southeast.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.phoneP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                southeast.phoneP++;
                                southeast.noremoteResolved++;
                                southeast.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.phoneP++;
                            } else {
                                southeast.phoneP++;
                                southeast.noremoteCallout++;
                                southeast.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.phoneP++;
                            }
                        }
                    } else if (datachunk.GeneratedBy == 'Bureau') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                southeast.selfP++;
                                southeast.remoteResolved++;
                                southeast.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.selfP++;
                            } else {
                                southeast.selfP++;
                                southeast.remoteCallout++;
                                southeast.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.selfP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                southeast.selfP++;
                                southeast.noremoteResolved++;
                                southeast.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.selfP++;
                            } else {
                                southeast.selfP++;
                                southeast.noremoteCallout++;
                                southeast.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.selfP++;
                            }
                        }
                    }
                }
                if(datachunk.Region === 'South West') {
                    if (datachunk.GeneratedBy == 'Email') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                southwest.emailP++;
                                southwest.remoteResolved++;
                                southwest.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.emailP++;
                            } else {
                                southwest.emailP++;
                                southwest.remoteCallout++;
                                southwest.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.emailP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                southwest.emailP++;
                                southwest.noremoteResolved++;
                                southwest.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.emailP++;
                            } else {
                                southwest.emailP++;
                                southwest.noremoteCallout++;
                                southwest.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.emailP++;
                            }
                        }
                    } else if (datachunk.GeneratedBy == 'Phone') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                southwest.phoneP++;
                                southwest.remoteResolved++;
                                southwest.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.phoneP++;
                            } else {
                                southwest.phoneP++;
                                southwest.remoteCallout++;
                                southwest.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.phoneP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                southwest.phoneP++;
                                southwest.noremoteResolved++;
                                southwest.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.phoneP++;
                            } else {
                                southwest.phoneP++;
                                southwest.noremoteCallout++;
                                southwest.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.phoneP++;
                            }
                        }
                    } else if (datachunk.GeneratedBy == 'Bureau') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                southwest.selfP++;
                                southwest.remoteResolved++;
                                southwest.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.selfP++;
                            } else {
                                southwest.selfP++;
                                southwest.remoteCallout++;
                                southwest.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.selfP++;
                            }
                        }
                        else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                southwest.selfP++;
                                southwest.noremoteResolved++;
                                southwest.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.selfP++;
                            } else {
                                southwest.selfP++;
                                southwest.noremoteCallout++;
                                southwest.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.selfP++;
                            }
                        }
                    }
                } 
                if(datachunk.Region === 'London') {
                    if (datachunk.GeneratedBy == 'Email') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                london.emailP++;
                                london.remoteResolved++;
                                london.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.emailP++;
                            } else {
                                london.emailP++;
                                london.remoteCallout++;
                                london.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.emailP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                london.emailP++;
                                london.noremoteResolved++;
                                london.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.emailP++;
                            } else {
                                london.emailP++;
                                london.noremoteCallout++;
                                london.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.emailP++;
                            }
                        }
                    } else if (datachunk.GeneratedBy == 'Phone') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                london.phoneP++;
                                london.remoteResolved++;
                                london.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.phoneP++;
                            } else {
                                london.phoneP++;
                                london.remoteCallout++;
                                london.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.phoneP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                london.phoneP++;
                                london.noremoteResolved++;
                                london.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.phoneP++;
                            } else {
                                london.phoneP++;
                                london.noremoteCallout++;
                                london.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.phoneP++;
                            }
                        }
                    } else if (datachunk.GeneratedBy == 'Bureau') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                london.selfP++;
                                london.remoteResolved++;
                                london.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.selfP++;
                            } else {
                                london.selfP++;
                                london.remoteCallout++;
                                london.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.selfP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                london.selfP++;
                                london.noremoteResolved++;
                                london.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.selfP++;
                            } else {
                                london.selfP++;
                                london.noremoteCallout++;
                                london.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.selfP++;
                            }
                        }
                    } 
                }
                if(datachunk.Region === 'West Midlands') {
                    if (datachunk.GeneratedBy == 'Email') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                westmids.emailP++;
                                westmids.remoteResolved++;
                                westmids.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.emailP++;
                            } else {
                                westmids.emailP++;
                                westmids.remoteCallout++;
                                westmids.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.emailP++;
                            }
                        }else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                westmids.emailP++;
                                westmids.noremoteResolved++;
                                westmids.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.emailP++;
                            } else {
                                westmids.emailP++;
                                westmids.noremoteCallout++;
                                westmids.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.emailP++;
                            }
                        }
                    } else if (datachunk.GeneratedBy == 'Phone') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                westmids.phoneP++;
                                westmids.remoteResolved++;
                                westmids.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.phoneP++;
                            } else {
                                westmids.phoneP++;
                                westmids.remoteCallout++;
                                westmids.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.phoneP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                westmids.phoneP++;
                                westmids.noremoteResolved++;
                                westmids.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.phoneP++;
                            } else {
                                westmids.phoneP++;
                                westmids.noremoteCallout++;
                                westmids.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.phoneP++;
                            }
                        }
                    } else if (datachunk.GeneratedBy == 'Bureau') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                westmids.selfP++;
                                westmids.remoteResolved++;
                                westmids.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.selfP++;
                            } else {
                                westmids.selfP++;
                                westmids.remoteCallout++;
                                westmids.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.selfP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                westmids.selfP++;
                                westmids.noremoteResolved++;
                                westmids.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.selfP++;
                            } else {
                                westmids.selfP++;
                                westmids.noremoteCallout++;
                                westmids.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.selfP++;
                            }
                        }
                    } 
                }
                if(datachunk.Region === 'East Midlands') {
                    if (datachunk.GeneratedBy == 'Email') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                eastmids.emailP++;
                                eastmids.remoteResolved++;
                                eastmids.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.emailP++;
                            } else {
                                eastmids.emailP++;
                                eastmids.remoteCallout++;
                                eastmids.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.emailP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                eastmids.emailP++;
                                eastmids.noremoteResolved++;
                                eastmids.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.emailP++;
                            } else {
                                eastmids.emailP++;
                                eastmids.noremoteCallout++;
                                eastmids.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.emailP++;
                            }
                        }
                    } else if (datachunk.GeneratedBy == 'Phone') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                eastmids.phoneP++;
                                eastmids.remoteResolved++;
                                eastmids.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.phoneP++;
                            } else {
                                eastmids.phoneP++;
                                eastmids.remoteCallout++;
                                eastmids.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.phoneP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                eastmids.phoneP++;
                                eastmids.noremoteResolved++;
                                eastmids.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.phoneP++;
                            } else {
                                eastmids.phoneP++;
                                eastmids.noremoteCallout++;
                                eastmids.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.phoneP++;
                            }
                        }
                    } else if (datachunk.GeneratedBy == 'Bureau') {
                        if (datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                eastmids.selfP++;
                                eastmids.remoteResolved++;
                                eastmids.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.selfP++;
                            } else {
                                eastmids.selfP++;
                                eastmids.remoteCallout++;
                                eastmids.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.selfP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                eastmids.selfP++;
                                eastmids.noremoteResolved++;
                                eastmids.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.selfP++;
                            } else {
                                eastmids.selfP++;
                                eastmids.noremoteCallout++;
                                eastmids.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.selfP++;
                            }
                        }
                    }
                }
                if(datachunk.Region === 'North East') {
                    if (datachunk.GeneratedBy == 'Email') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                northeast.emailP++;
                                northeast.remoteResolved++;
                                northeast.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.emailP++;
                            } else {
                                northeast.emailP++;
                                northeast.remoteCallout++;
                                northeast.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.emailP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                northeast.emailP++;
                                northeast.noremoteResolved++;
                                northeast.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.emailP++;
                            } else {
                                northeast.emailP++;
                                northeast.noremoteCallout++;
                                northeast.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.emailP++;
                            }
                        }
                    } else if (datachunk.GeneratedBy == 'Phone') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                northeast.phoneP++;
                                northeast.remoteResolved++;
                                northeast.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.phoneP++;
                            } else {
                                northeast.phoneP++;
                                northeast.remoteCallout++;
                                northeast.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.phoneP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                northeast.phoneP++;
                                northeast.noremoteResolved++;
                                northeast.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.phoneP++;
                            } else {
                                northeast.phoneP++;
                                northeast.noremoteCallout++;
                                northeast.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.phoneP++;
                            }
                        }
                    } else if (datachunk.GeneratedBy == 'Bureau') {
                        if (datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                northeast.selfP++;
                                northeast.remoteResolved++;
                                northeast.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.selfP++;
                            } else {
                                northeast.selfP++;
                                northeast.remoteCallout++;
                                northeast.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.selfP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                northeast.selfP++;
                                northeast.noremoteResolved++;
                                northeast.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.selfP++;
                            } else {
                                northeast.selfP++;
                                northeast.noremoteCallout++;
                                northeast.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.selfP++;
                            }
                        }
                    } 
                }
                if(datachunk.Region === 'North West') {
                    if (datachunk.GeneratedBy == 'Email') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                northwest.emailP++;
                                northwest.remoteResolved++;
                                northwest.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.emailP++;
                            } else {
                                northwest.emailP++;
                                northwest.remoteCallout++;
                                northwest.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.emailP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                northwest.emailP++;
                                northwest.noremoteResolved++;
                                northwest.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.emailP++;
                            } else {
                                northwest.emailP++;
                                northwest.noremoteCallout++;
                                northwest.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.emailP++;
                            }
                        }
                    } else if (datachunk.GeneratedBy == 'Phone') {
                        if (datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                northwest.phoneP++;
                                northwest.remoteResolved++;
                                northwest.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.phoneP++;
                            } else {
                                northwest.phoneP++;
                                northwest.remoteCallout++;
                                northwest.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.phoneP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                northwest.phoneP++;
                                northwest.noremoteResolved++;
                                northwest.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.phoneP++;
                            } else {
                                northwest.phoneP++;
                                northwest.noremoteCallout++;
                                northwest.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.phoneP++;
                            }
                        }
                    } else if (datachunk.GeneratedBy == 'Bureau') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                northwest.selfP++;
                                northwest.remoteResolved++;
                                northwest.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.selfP++;
                            } else {
                                northwest.selfP++;
                                northwest.remoteCallout++;
                                northwest.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.selfP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                northwest.emailP++;
                                northwest.noremoteResolved++;
                                northwest.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.emailP++;
                            } else {
                                northwest.selfP++;
                                northwest.noremoteCallout++;
                                northwest.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.selfP++;
                            }
                        }
                    }
                }
                if(datachunk.Region === 'Scotland') {
                    if (datachunk.GeneratedBy == 'Email') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                scotland.emailP++;
                                scotland.remoteResolved++;
                                scotland.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.emailP++;
                            } else {
                                scotland.emailP++;
                                scotland.remoteCallout++;
                                scotland.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.emailP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                scotland.emailP++;
                                scotland.noremoteResolved++;
                                scotland.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.emailP++;
                            } else {
                                scotland.emailP++;
                                scotland.noremoteCallout++;
                                scotland.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.emailP++;
                            }
                        }
                    } else if (datachunk.GeneratedBy == 'Phone') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                scotland.phoneP++;
                                scotland.remoteResolved++;
                                scotland.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.phoneP++;
                            } else {
                                scotland.phoneP++;
                                scotland.remoteCallout++;
                                scotland.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.phoneP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                scotland.phoneP++;
                                scotland.noremoteResolved++;
                                scotland.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.phoneP++;
                            } else {
                                scotland.phoneP++;
                                scotland.noremoteCallout++;
                                scotland.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.phoneP++;
                            }
                        }
                    } else if (datachunk.GeneratedBy == 'Bureau') {
                        if(datachunk.RemoteConnection) {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                scotland.selfP++;
                                scotland.remoteResolved++;
                                scotland.total++;
                                totalmonth.remoteResolved++;
                                totalmonth.selfP++;
                            } else {
                                scotland.selfP++;
                                scotland.remoteCallout++;
                                scotland.total++;
                                totalmonth.remoteCallout++;
                                totalmonth.selfP++;
                            }
                        } else {
                            if(datachunk.ClosedStatus == 'Remote Resolution') {
                                scotland.selfP++;
                                scotland.noremoteResolved++;
                                scotland.total++;
                                totalmonth.noremoteResolved++;
                                totalmonth.selfP++;
                            } else {
                                scotland.selfP++;
                                scotland.noremoteCallout++;
                                scotland.total++;
                                totalmonth.noremoteCallout++;
                                totalmonth.selfP++;
                            }
                        }
                    }
                } 
            }
            res.render('./dashboard', { southeast, southwest, london, westmids, eastmids, northwest, northeast, scotland, 
                totalmonth, ytd: ytd, data, name: req.session.username, 
                ytdcalls: ytdcalls, ytdmails: ytdmails, ytdself: ytdself, ytdremoteResolved: ytdremoteResolved, ytdnoremoteResolved: ytdnoremoteResolved,
                ytdremoteCallout: ytdremoteCallout, ytdnoremoteCallout: ytdnoremoteCallout, monthn: month, userLevel: req.session.UL
              })
    })
    .catch(error => console.log(error));
}


