import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../../interfaces/customer/customer';
import { Customersearch } from '../../interfaces/customer/customersearch';
import { Geozone } from '../../interfaces/job-address/geozone';
import { JobAddress } from '../../interfaces/job-address/job-address';
import { JobAddressInfo } from '../../interfaces/job-address/job-address-info';
import { Lead } from '../../interfaces/lead/lead';
import { LeadCounts } from '../../interfaces/lead/lead-counts';
import { LeadSource } from '../../interfaces/lead/lead-source';
import { LeadSubSource } from '../../interfaces/lead/lead-sub-source';
import { LeadType } from '../../interfaces/lead/lead-type';
import { SmartSchedulerResponse } from '../../interfaces/smart-scheduler/smart-scheduler-response';
import { Availability } from '../../interfaces/smart-scheduler/availability';
import { Appointment } from '../../interfaces/appointment/appointment';
import { SalesCalendarEvent } from '../../interfaces/calendar/sales-calendar-data';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { User } from '../../interfaces/auth/user';
import { EstimatorAvailability } from '../../interfaces/estimator-availability';
import { NewUser } from '../../interfaces/auth/new-user';
import { Role } from '../../interfaces/role';
import { GeoZoneFull } from '../../interfaces/geo-zone-full';
import { Estimator } from '../../interfaces/calendar/estimator';
import { UserRole } from '../../interfaces/user-role';
import { Note } from '../../interfaces/note';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  // Gets
  url = environment.apiurl;
  ProdUrl = "https://accutrac.net/api";

  getCustomersUrl = this.url + '/customers';
  getCustomerByIdUrl = this.url + '/Custid/%7BCustomerId%7D?';
  searchCustomerUrl = this.url + '/search/customer/%7Bid,CC,jobaddress,LastName%7D?';
  leadSourcesUrl = this.url + '/lead/leadsource';
  leadSubSourcesUrl = this.url + '/Lead/LeadSource/SubSource';
  getLeadUrl = this.url + '/Lead/%7Bid,cc%7D?';
  leadTypesUrl = this.url + '/lead/leadtype/';
  getLeadsByStatusUrl = this.url + '/lead/status/%7Bstatus,company_code%7D?';
  getGeoZoneByZipUrl = this.url + '/GeoZones';
  getJobAddressInfoUrl = this.url + '/JobAddress/Info/%7Bcompany_code,jobaddressid,customerid%7D?';
  getSmartSchedulerDataUrl = this.url + '/ProcessAvailablity/%7BuserName,geoZone,leadType,jobAddress%7D?';
  getProcesssedAvailabilityUrl = this.url + '/ResetFilter/';
  getSalesCalendarUrl = this.url + '/SalesCalendar/%7Bcc,employeeid,date%20%7D?';
  getUserDataUrl = this.url + '/users/%7BCompany_Code,UserId,Name%7D?';
  getEstimatorAvailabilityUrl = this.url + '/estavailskill/%7Bcompany_code,userid%7D?';
  getRolesUrl = this.url + '/user/Roles/%7BCompany_Code,Desc%7D?';
  getAllGeoZonesUrl = this.url + '/GeoZones/All?';
  getEstimatorsUrl = this.url + '/Sales/Estimators';
  getUserRoleUrl = this.url + '/Admin/Users/Role/Get/%7Bcompany_code,userid%7D?';
  getCustomerNotesUrl = this.url + '/Notes/%7Bcc,jobaddressid,customerid%7D?';
  
  // Get Counts
  getLeadCountsUrl = this.url + '/lead/counts';

  // Posts
  insertCustomerUrl = this.url + '/customers';
  insertJobAddressUrl = this.url + '/JobAddress';
  insertLeadUrl = this.url + '/lead';
  insertAppointmentUrl = this.url + '/Appoinment';
  insertUserUrl = this.url + '/admin/users/post';
  insertEstimatorAvailabilityUrl = this.url + '/EstAvailSkill/Insert';

  // Updates
  updateCustomerUrl = this.url + '/customers';
  updateLeadUrl = this.url + '/lead/%7Bid%7D?';

  // Deletes
  deleteEstimatorAvailabilityUrl = this.url + '/EstAvailSkill/Delete/%7Bcompany_code,uniqueid%7D?';

  insertChooseFileUrl = this.url + '/Files/uploadFiles/%7Bcompany_code,jobaddressid,customerid%7D?';
  getAttachmentInfoUrl = this.url + '/Attachment/%7Bcompany_code,jobaddressid,customerid%7D?';
  insertAttachmentUrl = this.url + '/Attchment';

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { }

  GetAttachementById(customerId?: string, jobAddressId?: string): Observable<any[]> {
    let params = new HttpParams().set('cc', this.localStorage.get('companyCode'));
    jobAddressId ? params = params.set('id', jobAddressId) : params = params.set('id', ' ');
    customerId ? params = params.set('custid', customerId) : params = params.set('custid', ' ');

    return this.http.get<any[]>(this.getAttachmentInfoUrl, { params });
  }

  attachmentsSaveData(jobAddressInfo: any): Observable<string> {
    return this.http.post<string>(this.insertAttachmentUrl, jobAddressInfo);
  }

  SaveChooseFileData(formData: any, customerId?: string, jobAddressId?: string): Observable<any> {
    let params = new HttpParams().set('cc', this.localStorage.get('companyCode'));
    jobAddressId ? params = params.set('id', jobAddressId) : params = params.set('id', ' ');
    customerId ? params = params.set('custid', customerId) : params = params.set('custid', ' ');

    return this.http.post<any>(this.insertChooseFileUrl, formData, { params });
  }

  // Gets
  getCustomerData(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.getCustomersUrl);
  }

  getCustomerById(id: string): Observable<Customer> {
    let params = new HttpParams().set('custid', id)
    return this.http.get<Customer>(this.getCustomerByIdUrl, { params });
  }

  getJobAddressInfo(customerId?: string, jobAddressId?: string): Observable<JobAddressInfo[]> {
    let params = new HttpParams().set('cc', this.localStorage.get('companyCode'));
    customerId ? params = params.set('custid', customerId) : params = params.set('custid', '');
    jobAddressId ? params = params.set('id', jobAddressId) : params = params.set('id', '');

    return this.http.get<JobAddressInfo[]>(this.getJobAddressInfoUrl, { params });
  }

  getLeadData(id: string): Observable<Lead> {
    let params = new HttpParams().set('id', id);
    params = params.set('cc', this.localStorage.get('companyCode'));
    return this.http.get<Lead>(this.getLeadUrl, { params });
  }

  getLeadSources(): Observable<LeadSource[]> {
    return this.http.get<LeadSource[]>(this.leadSourcesUrl);
  }

  getSubSources(id: number): Observable<LeadSubSource[]> {
    let params = new HttpParams().set('id', id);
    return this.http.get<LeadSubSource[]>(this.leadSubSourcesUrl, { params });
  }

  getLeadTypes(): Observable<LeadType[]> {
    return this.http.get<LeadType[]>(this.leadTypesUrl + this.localStorage.get('companyCode'));
  }

  getSalesCalendar(employeeid: string, date: string): Observable<SalesCalendarEvent[]> {
    let params = new HttpParams().set('cc', this.localStorage.get('companyCode'));
    params = params.set('date', date);
    params = params.set('employeeId', employeeid);
    return this.http.get<SalesCalendarEvent[]>(this.getSalesCalendarUrl, { params });
  }

  customerSearch(searchTerms?: Customersearch): Observable<Customer[]> {
    // Will need to differentiate between searchType at some point
    let params = new HttpParams();
    let companyCode = this.localStorage.get('companyCode');
    // Will need to acctually setup cc at some point
    params = params.set('cc', companyCode);
    if (searchTerms?.id) {
      params = params.set('id', searchTerms?.id);
    } 
    else {
      params = params.set('id', '');
    }
    if (searchTerms?.lastName) {
      params = params.set('lastName', searchTerms?.lastName);
    }
    else {
      params = params.set('lastName', '');
    }
    if (searchTerms?.jobAddress) {
      params = params.set('jobAddress', searchTerms?.jobAddress);
    }
    else {
      params = params.set('jobAddress', '');
    }

    return this.http.get<Customer[]>(this.searchCustomerUrl, { params })
  }

  getSmartSchedulerData(cc: string, userName: string, geoZoneId: Number, leadType: Number, jobAddress: string): Observable<SmartSchedulerResponse> {
    let params = new HttpParams().set('userName', userName);
    params = params.set('geoZone', geoZoneId.toString());
    params = params.set('leadType', leadType.toString());
    params = params.set('jobAddress', jobAddress);
    params = params.set('company_code', cc);
    return this.http.get<SmartSchedulerResponse>(this.getSmartSchedulerDataUrl, { params });
  }

  // Only to be used in smart scheduler. Only works after data has been processed
  getProcessedAvailability(userName: string): Observable<Availability[]> {
    return this.http.get<Availability[]>(this.getProcesssedAvailabilityUrl + userName);
  }

  getLeadsByStatus(status: string, companyCode: string): Observable<Lead[]> {
    let params = new HttpParams().set('status', status);
    params = params.set('company_code', companyCode);
    return this.http.get<Lead[]>(this.getLeadsByStatusUrl, { params });
  }

  getGeoZoneByZip(zipcode: string): Observable<Geozone> {
    return this.http.get<Geozone>(this.getGeoZoneByZipUrl + '/' + zipcode)
  }

  getUserData(userid?: string, name?: string): Observable<NewUser[]> {
    let params = new HttpParams().set('company_code', this.localStorage.get('companyCode'));
    userid ? params = params.set('userid', userid) : params = params.set('userid', '');
    name ? params = params.set('name', name) : params = params.set('name', '');
    return this.http.get<NewUser[]>(this.getUserDataUrl, { params });
  }

  getEstimatorAvailability(userId: string): Observable<EstimatorAvailability[]> {
    let params = new HttpParams().set('company_code', this.localStorage.get('companyCode'));
    params = params.set('userid', userId);
    return this.http.get<EstimatorAvailability[]>(this.getEstimatorAvailabilityUrl, { params });
  }

  getRoles(): Observable<Role[]> {
    let params = new HttpParams().set('company_code', this.localStorage.get('companyCode'));
    params = params.set('desc', '');
    return this.http.get<Role[]>(this.getRolesUrl, { params });
  }

  getAllGeoZones(): Observable<GeoZoneFull[]> {
    let params = new HttpParams().set('company_code', this.localStorage.get('companyCode'));
    return this.http.get<GeoZoneFull[]>(this.getAllGeoZonesUrl, { params });
  }

  getEstimators(): Observable<Estimator[]> {
    return this.http.get<Estimator[]>(this.getEstimatorsUrl + '/' + this.localStorage.get('companyCode'));
  }

  getUserRole(userId: string): Observable<UserRole[]> {
    let params = new HttpParams().set('company_code', this.localStorage.get('companyCode'));
    params = params.set('userid', userId);
    return this.http.get<UserRole[]>(this.getUserRoleUrl, { params });
  }

  getCustomerNotes(customerId?: string, jobAddressId?: string): Observable<Note[]> {
    let params = new HttpParams().set('company_code', this.localStorage.get('companyCode'));
    jobAddressId ? params = params.set('jobAddressId', jobAddressId) : params = params.set('jobAddressId', ' ');
    customerId ? params = params.set('customerId', customerId) : params = params.set('customerId', ' ');

    return this.http.get<Note[]>(this.getCustomerNotesUrl, { params });
  }

  // Get Counts
  getLeadCounts(): Observable<LeadCounts> {
    return this.http.get<LeadCounts>(this.getLeadCountsUrl + '/' + this.localStorage.get('companyCode'));
  }

  // Posts
  createCustomer(customerObject: Customer): Observable<number> {
    return this.http.post<number>(this.insertCustomerUrl, customerObject);
  }

  createJobAddress(jobAddressObject: JobAddress): Observable<number> {
    return this.http.post<number>(this.insertJobAddressUrl, jobAddressObject);
  }

  createLead(leadObject: Lead): Observable<number> {
    return this.http.post<number>(this.insertLeadUrl, leadObject);
  }

  createAppointment(appointmentObject: Appointment): Observable<number> {
    return this.http.post<number>(this.insertAppointmentUrl, appointmentObject);
  }

  createUser(userObject: NewUser): Observable<void> {
    return this.http.post<void>(this.insertUserUrl, userObject);
  }
  
  createEstimatorAvailability(estimatorAvailabilityObject: EstimatorAvailability): Observable<void> {
    return this.http.post<void>(this.insertEstimatorAvailabilityUrl, estimatorAvailabilityObject);
  }

  // Updates

  updateCustomer(customerObject: Customer) {
    return this.http.put<Customer>(this.updateCustomerUrl, customerObject);
  } 

  updateLead(leadObject: Lead) {
    return this.http.put<Lead>(this.updateLeadUrl, leadObject);
  }

  // Deletes
  deleteEstimatorAvailability(uniqueId: string) {
    let params = new HttpParams().set('company_code', this.localStorage.get('companyCode'));
    params = params.set('uniqueId', uniqueId);
    return this.http.delete<void>(this.deleteEstimatorAvailabilityUrl, { params });
  }
}
