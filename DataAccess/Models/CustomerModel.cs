using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Models;

public class CustomerModel

{
    public string? Company_Code { get; set; }

    public int Customerid { get; set; }

    public int? CustomerType { get; set; }

    public string? CompanyName { get; set; }

    public string? FirstName { get; set; }

    public string? LastName { get; set; }
  
    public string? MailingAddress { get; set; }

    public string? MailingAddress2 { get; set; }

    public string? MailingCity { get; set; }

    public string? MailingState { get; set; }

    public int? MailingZip { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public int? PhoneType { get; set; }

    public string? CreatedBy { get; set; }

    public DateTimeOffset? CreatedDate { get; set; }

    public string? UpdatedBy { get; set; }

    public DateTimeOffset? UpdatedDate { get; set; }

    public string? Notes { get; set; }

    public string? UserDefinedstr1 { get; set; }

    public int UserDefinedint1 { get; set; }

    public string? UserDefinedstr2 { get; set; }

    public int? UserDefinedInt2 { get; set; }

    public string? UserDefinedstr3 { get; set; }

    public int? Userdefinedint3 { get; set; }

}

