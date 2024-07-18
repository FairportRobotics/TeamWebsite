/* eslint-disable react/no-unescaped-entities */
import { Metadata } from "next";
import Image from "next/image";
import members from "@/Members.json"
import { FormInput } from "lucide-react";
export const metadata: Metadata = {
    title: "Fairport Robotics - Team 578",
    description: "About Our Team.",
};

const stats = [
    { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
    { id: 2, name: 'Assets under holding', value: '$119 trillion' },
    { id: 3, name: 'New users annually', value: '46,000' },
]


export default function Home() {

    //console.log(JSON.stringify(members,null,2))

    const search = ()=>{ console.log("wabung")}
    return (
        <>
            <header className="bg-gray shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    <p>
                        Hello, we are Team 578! Below are some members of our team.
                    </p>
                    <form action={search}>
                        <input name="query" />
                        <button type="submit">Search</button>
                    </form>
                    <p>
                        fourm aboveS
                    </p>
                    <FormInput>

                    </FormInput>
                </div>

            </main>
        </>
    );
}
