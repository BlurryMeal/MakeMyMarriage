
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus } from 'lucide-react';

const SettingsTab = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6">
          <Tabs defaultValue="account">
            <TabsList className="w-full border-b mb-6">
              <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
              <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
              <TabsTrigger value="password" className="flex-1">Password & Security</TabsTrigger>
              <TabsTrigger value="billing" className="flex-1">Billing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first-name">First Name</Label>
                    <Input id="first-name" defaultValue="Raj" />
                  </div>
                  <div>
                    <Label htmlFor="last-name">Last Name</Label>
                    <Input id="last-name" defaultValue="Sharma" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="raj@vibrantphotography.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Preferences</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Communication</p>
                      <p className="text-sm text-gray-500">Receive email updates about bookings and inquiries</p>
                    </div>
                    <Button variant="outline">Enabled</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Notifications</p>
                      <p className="text-sm text-gray-500">Receive text messages for booking confirmations</p>
                    </div>
                    <Button variant="outline">Disabled</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-wedding-red hover:bg-wedding-red/90">Save Changes</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="notifications" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <p className="font-medium">New Booking</p>
                    <p className="text-sm text-gray-500">Notify when a client books your service</p>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm" className="bg-wedding-red/10 text-wedding-red">Email</Button>
                    <Button variant="outline" size="sm" className="bg-wedding-red/10 text-wedding-red">SMS</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <p className="font-medium">New Message</p>
                    <p className="text-sm text-gray-500">Notify when a client sends you a message</p>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm" className="bg-wedding-red/10 text-wedding-red">Email</Button>
                    <Button variant="outline" size="sm">SMS</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <p className="font-medium">New Review</p>
                    <p className="text-sm text-gray-500">Notify when a client leaves a review</p>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm" className="bg-wedding-red/10 text-wedding-red">Email</Button>
                    <Button variant="outline" size="sm">SMS</Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Payment Received</p>
                    <p className="text-sm text-gray-500">Notify when you receive a payment</p>
                  </div>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="sm" className="bg-wedding-red/10 text-wedding-red">Email</Button>
                    <Button variant="outline" size="sm" className="bg-wedding-red/10 text-wedding-red">SMS</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-wedding-red hover:bg-wedding-red/90">Save Preferences</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="password" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Change Password</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-wedding-red hover:bg-wedding-red/90">Update Password</Button>
              </div>
            </TabsContent>
            
            <TabsContent value="billing" className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Subscription Plan</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Premium Plan</p>
                      <p className="text-sm text-gray-500">₹1,499/month, billed annually</p>
                    </div>
                    <Button variant="outline">Upgrade</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-12 h-8 bg-blue-600 rounded mr-3"></div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-gray-500">Expires 12/2025</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">Edit</Button>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Payment Method
                </Button>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-4">Billing History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Apr 1, 2023</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">Premium Plan - Annual</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">₹17,988</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className="inline-flex px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Paid</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SettingsTab;
