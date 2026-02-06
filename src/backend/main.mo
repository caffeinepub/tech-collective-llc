import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile System
  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Contact Inquiry System
  type Inquiry = {
    id : Nat;
    name : Text;
    contactInfo : Text; // email or phone
    serviceInterested : Text;
    message : Text;
  };

  let inquiries = Map.empty<Nat, Inquiry>();
  var nextInquiryId = 0;

  // Public endpoint - anyone including guests can submit inquiries
  public shared ({ caller }) func submitInquiry(name : Text, contactInfo : Text, serviceInterested : Text, message : Text) : async () {
    let inquiry : Inquiry = {
      id = nextInquiryId;
      name;
      contactInfo;
      serviceInterested;
      message;
    };

    inquiries.add(nextInquiryId, inquiry);
    nextInquiryId += 1;
  };

  // Admin-only endpoint to view all inquiries
  public query ({ caller }) func getAllInquiries() : async [Inquiry] {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can view all inquiries");
    };
    inquiries.values().toArray();
  };
};
