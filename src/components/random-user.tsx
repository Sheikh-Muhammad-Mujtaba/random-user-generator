"use client"

import { useState, useEffect } from "react";
import {
    Card,
    CardHeader,
    CardContent,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { CSSTransition } from "react-transition-group";
import { MailIcon, MapPinIcon, UserIcon, InfoIcon } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "./ui/select";


interface User {
    name: string;
    email: string;
    address: string;
    image: string;
    description: string;
}

const RandomUserComponent: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [appreciationVisible, setAppreciationVisible] = useState<boolean>(false);
    const [gender, setGender] = useState<string>("any");

    const fetchRandomUser = async () => {
        setLoading(true);
        setError(null);

        const genderQuery = gender === "any" ? "" : gender;

        try {
            const response = await fetch(`https://randomuser.me/api/?gender=${genderQuery}`);
            if (!response.ok) throw new Error(`Error: ${response.status}`);
            const data = await response.json();
            const fetchedUser = data.results[0];
            setUser({
                name: `${fetchedUser.name.first} ${fetchedUser.name.last}`,
                email: fetchedUser.email,
                address: `${fetchedUser.location.street.number}, ${fetchedUser.location.street.name}, ${fetchedUser.location.city}, ${fetchedUser.location.country}`,
                image: fetchedUser.picture.large,
                description: fetchedUser.login.uuid,
            });
        } catch (err: any) {
            setError(err.message || "Failed to fetch user.");
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchRandomUser();
    }, []);

    const handleAppreciate = () => {
        setAppreciationVisible(true);
        setTimeout(() => setAppreciationVisible(false), 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-200 dark:bg-zinc-900 text-center text-foreground">
            <h1 className="text-3xl font-bold mb-4">Random User Generator</h1>
            <p className="text-muted-foreground mb-6">
                Click the button below to fetch a random user profile.
            </p>


            <div className="flex flex-wrap gap-2 items-center justify-center mb-6">
                <Select onValueChange={(value) => setGender(value)}>
                    <SelectTrigger className="w-[180px] bg-secondary shadow-sm shadow-foreground">
                        <SelectValue placeholder="Select a Gender" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Gender</SelectLabel>
                            <SelectItem value="any">Any</SelectItem>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Button onClick={() => fetchRandomUser()} disabled={loading} variant={"secondary"}>
                    {loading ? "Fetching..." : "Fetch New User"}
                </Button>
            </div>



            {error && <div className="text-red-500">{error}</div>}

            {user && (
                <Card className="border-0 cursor-pointer shadow-md rounded-lg overflow-hidden max-w-sm relative shadow-current hover:scale-105">
                    <CardHeader className="h-32 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 relative">
                        <Image
                            src={user.image}
                            alt={`Profile picture of ${user.name}`}
                            width={200}
                            height={200}
                            className="w-[80px] h-[80px] object-scale-down rounded-full border-4 border-white absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
                        />
                    </CardHeader>
                    <CardContent className="p-6 pt-12 text-center">
                        <CardTitle className="text-xl font-bold font-serif flex items-center justify-center">
                            <UserIcon className="mr-2" /> {user.name}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground flex items-center justify-center">
                            <MailIcon className="mr-2" /> {user.email}
                        </CardDescription>
                        <div className="text-sm text-muted-foreground mt-2 flex items-center justify-center">
                            <MapPinIcon className="mr-2" /> {user.address}
                        </div>
                        <div className="text-sm text-muted-foreground mt-2 flex items-center justify-center">
                            <InfoIcon className="mr-2" /> {user.description}
                        </div>
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={handleAppreciate}
                        >
                            Appreciate
                        </Button>
                    </CardContent>
                    <CSSTransition
                        in={appreciationVisible}
                        timeout={300}
                        classNames="appreciation"
                        unmountOnExit
                    >
                        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75">
                            <h2 className="text-2xl font-bold text-black">❤️ Thank you ✨</h2>
                        </div>
                    </CSSTransition>
                </Card>
            )}

        </div>
    );


};


export default RandomUserComponent; 