 /**
 *  Copyright (C) 2010 Cloud.com, Inc.  All rights reserved.
 * 
 * This software is licensed under the GNU General Public License v3 or later.
 * 
 * It is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * 
 */

var rootDomainId = 1;
var systemAccountId = 1;
var adminAccountId = 2;

function accountGetSearchParams() {
    var moreCriteria = [];	

	var $advancedSearchPopup = $("#advanced_search_popup");
	if (lastSearchType == "advanced_search" && $advancedSearchPopup.length > 0) {
	    var name = $advancedSearchPopup.find("#adv_search_name").val();							
		if (name != null && name.length > 0) 
			moreCriteria.push("&name="+todb(name));	
		
		var role = $advancedSearchPopup.find("#adv_search_role").val();	
		if (role != null && role.length > 0) 
				moreCriteria.push("&accounttype="+role);	
	} 
	else {     			    		
	    var searchInput = $("#basic_search").find("#search_input").val();	 
        if (lastSearchType == "basic_search" && searchInput != null && searchInput.length > 0) {	           
            moreCriteria.push("&name="+todb(searchInput));	       
        }        
	}
	
	return moreCriteria.join("");          
}

function afterLoadAccountJSP() {
    initDialog("dialog_resource_limits");
    initDialog("dialog_disable_account");
    initDialog("dialog_lock_account");
    initDialog("dialog_enable_account");  
    
    // switch between different tabs 
    var tabArray = [$("#tab_details"), $("#tab_user")];
    var tabContentArray = [$("#tab_content_details"), $("#tab_content_user")];
    var afterSwitchFnArray = [accountJsonToDetailsTab, accountJsonToUserTab];
    switchBetweenDifferentTabs(tabArray, tabContentArray, afterSwitchFnArray);       
      
    initTimezonesObj();  
       
    if(isAdmin()) {
        initAddUserDialog();   
    }      
}

function initTimezonesObj() {
    var timezones = new Object();    
    timezones['Etc/GMT+12']='[UTC-12:00] GMT-12:00';
    timezones['Etc/GMT+11']='[UTC-11:00] GMT-11:00';
    timezones['Pacific/Samoa']='[UTC-11:00] Samoa Standard Time';
    timezones['Pacific/Honolulu']='[UTC-10:00] Hawaii Standard Time';
    timezones['US/Alaska']='[UTC-09:00] Alaska Standard Time';
    timezones['America/Los_Angeles']='[UTC-08:00] Pacific Standard Time';
    timezones['Mexico/BajaNorte']='[UTC-08:00] Baja California';
    timezones['US/Arizona']='[UTC-07:00] Arizona';
    timezones['US/Mountain']='[UTC-07:00] Mountain Standard Time';
    timezones['America/Chihuahua']='[UTC-07:00] Chihuahua, La Paz';
    timezones['America/Chicago']='[UTC-06:00] Central Standard Time';
    timezones['America/Costa_Rica']='[UTC-06:00] Central America';
    timezones['America/Mexico_City']='[UTC-06:00] Mexico City, Monterrey';
    timezones['Canada/Saskatchewan']='[UTC-06:00] Saskatchewan';
    timezones['America/Bogota']='[UTC-05:00] Bogota, Lima';
    timezones['America/New_York']='[UTC-05:00] Eastern Standard Time';
    timezones['America/Caracas']='[UTC-04:00] Venezuela Time';
    timezones['America/Asuncion']='[UTC-04:00] Paraguay Time';
    timezones['America/Cuiaba']='[UTC-04:00] Amazon Time';
    timezones['America/Halifax']='[UTC-04:00] Atlantic Standard Time';
    timezones['America/La_Paz']='[UTC-04:00] Bolivia Time';
    timezones['America/Santiago']='[UTC-04:00] Chile Time';
    timezones['America/St_Johns']='[UTC-03:30] Newfoundland Standard Time';
    timezones['America/Araguaina']='[UTC-03:00] Brasilia Time';
    timezones['America/Argentina/Buenos_Aires']='[UTC-03:00] Argentine Time';
    timezones['America/Cayenne']='[UTC-03:00] French Guiana Time';
    timezones['America/Godthab']='[UTC-03:00] Greenland Time';
    timezones['America/Montevideo']='[UTC-03:00] Uruguay Time]';
    timezones['Etc/GMT+2']='[UTC-02:00] GMT-02:00';
    timezones['Atlantic/Azores']='[UTC-01:00] Azores Time';
    timezones['Atlantic/Cape_Verde']='[UTC-01:00] Cape Verde Time';
    timezones['Africa/Casablanca']='[UTC] Casablanca';
    timezones['Etc/UTC']='[UTC] Coordinated Universal Time';
    timezones['Atlantic/Reykjavik']='[UTC] Reykjavik';
    timezones['Europe/London']='[UTC] Western European Time';
    timezones['CET']='[UTC+01:00] Central European Time';
    timezones['Europe/Bucharest']='[UTC+02:00] Eastern European Time';
    timezones['Africa/Johannesburg']='[UTC+02:00] South Africa Standard Time';
    timezones['Asia/Beirut']='[UTC+02:00] Beirut';
    timezones['Africa/Cairo']='[UTC+02:00] Cairo';
    timezones['Asia/Jerusalem']='[UTC+02:00] Israel Standard Time';
    timezones['Europe/Minsk']='[UTC+02:00] Minsk';
    timezones['Europe/Moscow']='[UTC+03:00] Moscow Standard Time';
    timezones['Africa/Nairobi']='[UTC+03:00] Eastern African Time';
    timezones['Asia/Karachi']='[UTC+05:00] Pakistan Time';
    timezones['Asia/Kolkata']='[UTC+05:30] India Standard Time';
    timezones['Asia/Bangkok']='[UTC+05:30] Indochina Time';
    timezones['Asia/Shanghai']='[UTC+08:00] China Standard Time';
    timezones['Asia/Kuala_Lumpur']='[UTC+08:00] Malaysia Time';
    timezones['Australia/Perth']='[UTC+08:00] Western Standard Time (Australia)';
    timezones['Asia/Taipei']='[UTC+08:00] Taiwan';
    timezones['Asia/Tokyo']='[UTC+09:00] Japan Standard Time';
    timezones['Asia/Seoul']='[UTC+09:00] Korea Standard Time';
    timezones['Australia/Adelaide']='[UTC+09:30] Central Standard Time (South Australia)';
    timezones['Australia/Darwin']='[UTC+09:30] Central Standard Time (Northern Territory)';
    timezones['Australia/Brisbane']='[UTC+10:00] Eastern Standard Time (Queensland)';
    timezones['Australia/Canberra']='[UTC+10:00] Eastern Standard Time (New South Wales)';
    timezones['Pacific/Guam']='[UTC+10:00] Chamorro Standard Time';
    timezones['Pacific/Auckland']='[UTC+12:00] New Zealand Standard Time';
}

function initAddUserDialog() { 
    //dialogs
    initDialog("dialog_add_user", 450);
                   
    var $dialogAddUser = $("#dialog_add_user");
       
    $.ajax({
	    data: createURL("command=listDomains"),
		dataType: "json",
		success: function(json) {			           
			var domains = json.listdomainsresponse.domain;								
			var $dropDownBox = $dialogAddUser.find("#domain_dropdown").empty();									       		            							
			if (domains != null && domains.length > 0) {
				for (var i = 0; i < domains.length; i++) 				
					$dropDownBox.append("<option value='" + fromdb(domains[i].id) + "'>" + fromdb(domains[i].name) + "</option>"); 		
			}					    	
		}
	});		    
       
    //add button ***
    $("#midmenu_add_link").find("#label").text("Add User"); 
    $("#midmenu_add_link").show();     
    $("#midmenu_add_link").unbind("click").bind("click", function(event) {    		
		$dialogAddUser
		.dialog('option', 'buttons', { 					
			"Create": function() { 	
			    var $thisDialog = $(this);				    			
				// validate values
				var isValid = true;					
				isValid &= validateString("User name", $thisDialog.find("#add_user_username"), $thisDialog.find("#add_user_username_errormsg"), false);   //required
				isValid &= validateString("Password", $thisDialog.find("#add_user_password"), $thisDialog.find("#add_user_password_errormsg"), false);    //required	
				isValid &= validateString("Email", $thisDialog.find("#add_user_email"), $thisDialog.find("#add_user_email_errormsg"), true);              //optional	
				isValid &= validateString("First name", $thisDialog.find("#add_user_firstname"), $thisDialog.find("#add_user_firstname_errormsg"), true); //optional	
				isValid &= validateString("Last name", $thisDialog.find("#add_user_lastname"), $thisDialog.find("#add_user_lastname_errormsg"), true);    //optional	
				isValid &= validateString("Account", $thisDialog.find("#add_user_account"), $thisDialog.find("#add_user_account_errormsg"), true);        //optional	
				if (!isValid) 
				    return;
				
				var $midmenuItem1 = beforeAddingMidMenuItem() ;
								
				var array1 = [];																		
				var username = $thisDialog.find("#add_user_username").val();
				array1.push("&username="+todb(username));
				
				var password = $.md5(encodeURIComponent($thisDialog.find("#add_user_password").val()));
				array1.push("&password="+password);
				
				var email = $thisDialog.find("#add_user_email").val();
				if(email == "")
					email = username;
				array1.push("&email="+todb(email));
					
				var firstname = $thisDialog.find("#add_user_firstname").val();
				if(firstname == "")
					firstname = username;
				array1.push("&firstname="+todb(firstname));
					
				var lastname = $thisDialog.find("#add_user_lastname").val();
				if(lastname == "")
					lastname = username;
			    array1.push("&lastname="+todb(lastname));
					
				var account = $thisDialog.find("#add_user_account").val();					
				if(account == "")
					account = username;
			    array1.push("&account="+account);
					
				var accountType = $thisDialog.find("#add_user_account_type").val();	
				var domainId = $thisDialog.find("#domain_dropdown").val();				
				if (parseInt(domainId) != rootDomainId && accountType == "1") {
					accountType = "2"; // Change to domain admin 
				}
				array1.push("&accounttype="+accountType);			
				array1.push("&domainid="+domainId);
								
				var timezone = $thisDialog.find("#add_user_timezone").val();	
				if(timezone != null && timezone.length > 0)
	                array1.push("&timezone="+todb(timezone));	
	        						
				$thisDialog.dialog("close");					
									
				$.ajax({
					type: "POST",
				    data: createURL("command=createUser"+array1.join("")),
					dataType: "json",
					async: false,
					success: function(json) {						
						accountToMidmenu(json.createuserresponse.user, $midmenuItem1);
	                    bindClickToMidMenu($midmenuItem1, accountToRightPanel, getMidmenuId);  
	                    afterAddingMidMenuItem($midmenuItem1, true);								
					},			
                    error: function(XMLHttpResponse) {	                        
                        afterAddingMidMenuItem($midmenuItem1, false, parseXMLHttpResponse(XMLHttpResponse));        
                    }								
				});						
			},
			"Cancel": function() { 
				$(this).dialog("close"); 
			} 
		}).dialog("open");		
					
		return false;
	});
}

function accountToMidmenu(jsonObj, $midmenuItem1) {  
    $midmenuItem1.attr("id", getMidmenuId(jsonObj));  
    $midmenuItem1.data("jsonObj", jsonObj); 
    
    var $iconContainer = $midmenuItem1.find("#icon_container").show();   
    if (jsonObj.accounttype == roleTypeUser) 
        $iconContainer.find("#icon").attr("src", "images/midmenuicon_account_user.png");		
	else if (jsonObj.accounttype == roleTypeAdmin) 
	    $iconContainer.find("#icon").attr("src", "images/midmenuicon_account_admin.png");		
	else if (jsonObj.accounttype == roleTypeDomainAdmin) 
	    $iconContainer.find("#icon").attr("src", "images/midmenuicon_account_domain.png");	
    
    $midmenuItem1.find("#first_row").text(fromdb(jsonObj.name).substring(0,25)); 
    $midmenuItem1.find("#second_row").text(fromdb(jsonObj.domain).substring(0,25));   
}

function accountToRightPanel($midmenuItem1) { 
    copyActionInfoFromMidMenuToRightPanel($midmenuItem1);  
    $("#right_panel_content").data("$midmenuItem1", $midmenuItem1);  
    accountJsonToDetailsTab();   
}

function accountJsonToDetailsTab() {  
    var $midmenuItem1 = $("#right_panel_content").data("$midmenuItem1");
    if($midmenuItem1 == null)
        return;
    
    var jsonObj = $midmenuItem1.data("jsonObj");
    if(jsonObj == null)
        return;
  
    var $detailsTab = $("#right_panel_content").find("#tab_content_details");   
        
    $detailsTab.find("#grid_header_title").text(fromdb(jsonObj.name));
    $detailsTab.find("#id").text(fromdb(jsonObj.id));
    $detailsTab.find("#role").text(toRole(jsonObj.accounttype));
    $detailsTab.find("#account").text(fromdb(jsonObj.name));
    $detailsTab.find("#domain").text(fromdb(jsonObj.domain));
    $detailsTab.find("#vm_total").text(fromdb(jsonObj.vmtotal));
    $detailsTab.find("#ip_total").text(fromdb(jsonObj.iptotal));
    $detailsTab.find("#bytes_received").text(convertBytes(jsonObj.receivedbytes));
    $detailsTab.find("#bytes_sent").text(convertBytes(jsonObj.sentbytes));
    $detailsTab.find("#state").text(fromdb(jsonObj.state));
    
    //actions ***
    var $actionMenu = $("#right_panel_content #tab_content_details #action_link #action_menu");
    $actionMenu.find("#action_list").empty(); 
    var noAvailableActions = true;
  
    if(jsonObj.id != systemAccountId && jsonObj.id != adminAccountId) {        
        if (jsonObj.accounttype == roleTypeUser || jsonObj.accounttype == roleTypeDomainAdmin) {
            buildActionLinkForTab("Resource limits", accountActionMap, $actionMenu, $midmenuItem1, $detailsTab);	
            noAvailableActions = false;	
        }
         
        if(jsonObj.state == "enabled") {
            buildActionLinkForTab("Disable account", accountActionMap, $actionMenu, $midmenuItem1, $detailsTab);  
            buildActionLinkForTab("Lock account", accountActionMap, $actionMenu, $midmenuItem1, $detailsTab);
            noAvailableActions = false;	
        }          	        
        else if(jsonObj.state == "disabled" || jsonObj.state == "locked") {
            buildActionLinkForTab("Enable account", accountActionMap, $actionMenu, $midmenuItem1, $detailsTab);   
            noAvailableActions = false;	
        }                
    }  
    
    // no available actions 
	if(noAvailableActions == true) {
	    $actionMenu.find("#action_list").append($("#no_available_actions").clone().show());
	}	  
}

function accountJsonToUserTab() {       	
	var $midmenuItem1 = $("#right_panel_content").data("$midmenuItem1");	
	if($midmenuItem1 == null)
	    return;
	
	var jsonObj = $midmenuItem1.data("jsonObj");	
	if(jsonObj == null)
	    return;
	
	var $thisTab = $("#right_panel_content").find("#tab_content_user");	    
	$thisTab.find("#tab_container").hide(); 
    $thisTab.find("#tab_spinning_wheel").show();   
        
    $.ajax({
		cache: false,
		data: createURL("command=listUsers&domainid="+fromdb(jsonObj.id)+"&account="+fromdb(jsonObj.name)),
		dataType: "json",
		success: function(json) {						    
			var items = json.listusersresponse.user;																						
			if (items != null && items.length > 0) {
			    var $container = $thisTab.find("#tab_container").empty();
				var $template = $("#user_tab_template");				
				for (var i = 0; i < items.length; i++) {
					var $newTemplate = $template.clone(true);	               
	                accountUserJSONToTemplate(items[i], $newTemplate); 
	                $container.append($newTemplate.show());	
				}			
			}	
			$thisTab.find("#tab_spinning_wheel").hide();    
            $thisTab.find("#tab_container").show();    			
		}
	});
} 

function accountUserJSONToTemplate(jsonObj, $template) {
    $template.data("jsonObj", jsonObj);     
    $template.attr("id", "account_user_"+fromdb(jsonObj.id)).data("accountUserId", fromdb(jsonObj.id));    
    $template.find("#grid_header_title").text(fromdb(jsonObj.username));			   
    $template.find("#id").text(fromdb(jsonObj.id));
    $template.find("#username").text(fromdb(jsonObj.username));	
    $template.find("#account").text(fromdb(jsonObj.account));	
    $template.find("#role").text(toRole(fromdb(jsonObj.accounttype)));	
    
    $template.find("#domain").text(fromdb(jsonObj.domain));	
    $template.find("#email").text(fromdb(jsonObj.email));	
    $template.find("#firstname").text(fromdb(jsonObj.firstname));	
    $template.find("#lastname").text(fromdb(jsonObj.lastname));	
    $template.find("#timezone").text(timezones[fromdb(jsonObj.timezone)]);	
    $template.data("timezone", jsonObj.timezone); 
        
	var $actionLink = $template.find("#user_action_link");		
	$actionLink.bind("mouseover", function(event) {
        $(this).find("#user_action_menu").show();    
        return false;
    });
    $actionLink.bind("mouseout", function(event) {
        $(this).find("#user_action_menu").hide();    
        return false;
    });		
	
	/*
	var $actionMenu = $actionLink.find("#user_action_menu");
    $actionMenu.find("#action_list").empty();	    
    buildActionLinkForSubgridItem("xxxxxxx", accountUserActionMap, $actionMenu, $template);	    
    
    if(jsonObj.id==systemUserId || jsonObj.id==adminUserId) 
	    template.find("#delete_link").hide();
    */
} 

var accountActionMap = {  
    "Resource limits": {                 
        dialogBeforeActionFn : doResourceLimitsForAccount 
    } 
    ,
    "Disable account": {              
        isAsyncJob: true,
        asyncJobResponse: "disableaccountresponse",
        dialogBeforeActionFn : doDisableAccount,
        inProcessText: "Disabling account....",
        afterActionSeccessFn: function(json, $midmenuItem1, id) { 
            var item = json.queryasyncjobresultresponse.jobresult.account;
            accountToMidmenu(item, $midmenuItem1);           
            accountJsonToDetailsTab($midmenuItem1);
        }
    }    
    ,
    "Lock account": {              
        isAsyncJob: false,       
        dialogBeforeActionFn : doLockAccount,
        inProcessText: "Locking account....",
        afterActionSeccessFn: function(json, $midmenuItem1, id) {  
            var item = json.lockaccountresponse.account;            
            accountToMidmenu(item, $midmenuItem1);           
            accountJsonToDetailsTab($midmenuItem1);
        }
    }    
    ,
    "Enable account": {              
        isAsyncJob: false,       
        dialogBeforeActionFn : doEnableAccount,
        inProcessText: "Enabling account....",
        afterActionSeccessFn: function(json, $midmenuItem1, id) {   
            var item = json.enableaccountresponse.account;                  
            accountToMidmenu(item, $midmenuItem1);           
            accountJsonToDetailsTab($midmenuItem1);
        }
    }    
}; 

function updateResourceLimitForAccount(domainId, account, type, max) {
	$.ajax({
	    data: createURL("command=updateResourceLimit&domainid="+domainId+"&account="+account+"&resourceType="+type+"&max="+max),
		dataType: "json",
		success: function(json) {								    												
		}
	});
}

function doResourceLimitsForAccount($actionLink, $detailsTab, $midmenuItem1) {
    var $detailsTab = $("#right_panel_content #tab_content_details");  
	var jsonObj = $midmenuItem1.data("jsonObj");
	var domainId = jsonObj.domainid;
	var account = jsonObj.name;
	$.ajax({
		cache: false,				
		data: createURL("command=listResourceLimits&domainid="+domainId+"&account="+account),
		dataType: "json",
		success: function(json) {
			var limits = json.listresourcelimitsresponse.resourcelimit;		
			var preInstanceLimit, preIpLimit, preDiskLimit, preSnapshotLimit, preTemplateLimit = -1;
			if (limits != null) {	
				for (var i = 0; i < limits.length; i++) {
					var limit = limits[i];
					switch (limit.resourcetype) {
						case "0":
							preInstanceLimit = limit.max;
							$("#dialog_resource_limits #limits_vm").val(limit.max);
							break;
						case "1":
							preIpLimit = limit.max;
							$("#dialog_resource_limits #limits_ip").val(limit.max);
							break;
						case "2":
							preDiskLimit = limit.max;
							$("#dialog_resource_limits #limits_volume").val(limit.max);
							break;
						case "3":
							preSnapshotLimit = limit.max;
							$("#dialog_resource_limits #limits_snapshot").val(limit.max);
							break;
						case "4":
							preTemplateLimit = limit.max;
							$("#dialog_resource_limits #limits_template").val(limit.max);
							break;
					}
				}
			}	
			$("#dialog_resource_limits")
			.dialog('option', 'buttons', { 								
				"Save": function() { 	
					// validate values
					var isValid = true;					
					isValid &= validateNumber("Instance Limit", $("#dialog_resource_limits #limits_vm"), $("#dialog_resource_limits #limits_vm_errormsg"), -1, 32000, false);
					isValid &= validateNumber("Public IP Limit", $("#dialog_resource_limits #limits_ip"), $("#dialog_resource_limits #limits_ip_errormsg"), -1, 32000, false);
					isValid &= validateNumber("Disk Volume Limit", $("#dialog_resource_limits #limits_volume"), $("#dialog_resource_limits #limits_volume_errormsg"), -1, 32000, false);
					isValid &= validateNumber("Snapshot Limit", $("#dialog_resource_limits #limits_snapshot"), $("#dialog_resource_limits #limits_snapshot_errormsg"), -1, 32000, false);
					isValid &= validateNumber("Template Limit", $("#dialog_resource_limits #limits_template"), $("#dialog_resource_limits #limits_template_errormsg"), -1, 32000, false);
					if (!isValid) return;
												
					var instanceLimit = trim($("#dialog_resource_limits #limits_vm").val());
					var ipLimit = trim($("#dialog_resource_limits #limits_ip").val());
					var diskLimit = trim($("#dialog_resource_limits #limits_volume").val());
					var snapshotLimit = trim($("#dialog_resource_limits #limits_snapshot").val());
					var templateLimit = trim($("#dialog_resource_limits #limits_template").val());
											
					$(this).dialog("close"); 
					if (instanceLimit != preInstanceLimit) {
						updateResourceLimitForAccount(domainId, account, 0, instanceLimit);
					}
					if (ipLimit != preIpLimit) {
						updateResourceLimitForAccount(domainId, account, 1, ipLimit);
					}
					if (diskLimit != preDiskLimit) {
						updateResourceLimitForAccount(domainId, account, 2, diskLimit);
					}
					if (snapshotLimit != preSnapshotLimit) {
						updateResourceLimitForAccount(domainId, account, 3, snapshotLimit);
					}
					if (templateLimit != preTemplateLimit) {
						updateResourceLimitForAccount(domainId, account, 4, templateLimit);
					}
				}, 
				"Cancel": function() { 
					$(this).dialog("close"); 
				} 
			}).dialog("open");
		}
	});	
}

function doDisableAccount($actionLink, $detailsTab, $midmenuItem1) {       
    var jsonObj = $midmenuItem1.data("jsonObj");    
    var id = jsonObj.id;
    
    $("#dialog_disable_account")    
    .dialog('option', 'buttons', {                    
        "Yes": function() { 		                    
            $(this).dialog("close");	
			var apiCommand = "command=disableAccount&account="+jsonObj.name+"&domainId="+jsonObj.domainid;	    	
	    	doActionToTab(id, $actionLink, apiCommand, $midmenuItem1, $detailsTab) ;         		                    	     
        },
        "Cancel": function() {
            $(this).dialog("close");		     
        }
    }).dialog("open");  
}

function doLockAccount($actionLink, $detailsTab, $midmenuItem1) {       
    var jsonObj = $midmenuItem1.data("jsonObj");    
    
    $("#dialog_lock_account")    
    .dialog('option', 'buttons', {                    
        "Yes": function() { 		                    
            $(this).dialog("close");			
			var apiCommand = "command=lockAccount&account="+jsonObj.name+"&domainId="+jsonObj.domainid;
	    	doActionToTab(jsonObj.id, $actionLink, apiCommand, $midmenuItem1, $detailsTab);	         		                    	     
        },
        "Cancel": function() {
            $(this).dialog("close");		     
        }
    }).dialog("open");  
}

function doEnableAccount($actionLink, $detailsTab, $midmenuItem1) {       
    var jsonObj = $midmenuItem1.data("jsonObj");    
    
    $("#dialog_enable_account")    
    .dialog('option', 'buttons', {                    
        "Yes": function() { 		                    
            $(this).dialog("close");	
			var apiCommand = "command=enableAccount&account="+jsonObj.name+"&domainId="+jsonObj.domainid;
	    	doActionToTab(jsonObj.id, $actionLink, apiCommand, $midmenuItem1, $detailsTab);	         		                    	     
        },
        "Cancel": function() {
            $(this).dialog("close");		     
        }
    }).dialog("open");  
}