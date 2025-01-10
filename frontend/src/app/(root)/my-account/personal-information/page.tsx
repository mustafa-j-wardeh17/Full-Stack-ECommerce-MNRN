import DeleteSubscription from '@/components/my-account/personal-details/subscribe-toggle';
import UpdateUserInfo from '@/components/my-account/personal-details/update-user-info';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const PersonalInformation = () => {

    return (
        <div className='w-full'>
            <Tabs defaultValue='account' >
                <TabsList className='flex justify-between py-6'>
                    <TabsTrigger className='w-1/2 text-lg' value="account">Account</TabsTrigger>
                    <TabsTrigger className='w-1/2 text-lg' value="subscribe">Subscription</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <UpdateUserInfo />
                </TabsContent>
                <TabsContent value="subscribe">
                    <DeleteSubscription />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default PersonalInformation;
