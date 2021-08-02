using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebApplication15.Models;

namespace WebApplication15.Models
{
    public class Connection
    {
        public string SourceUid { get; set; }
        public string TargetUid { get; set; }

        public Connection()
        {
        }

        public Connection(string sourceUid, string targetUid)
        {
            SourceUid = sourceUid;
            TargetUid = targetUid;
        }

        public int insert()
        {
            DBservices db = new DBservices();
            return db.insert(this);
        }
        public int delete()
        {
            DBservices db = new DBservices();
            return db.delete(this);
        }
    }
}