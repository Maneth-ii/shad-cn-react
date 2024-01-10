"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

interface Recipe{
  title:string,
  image:string,
  time:number,
  description:string,
  vegan:boolean,
  id:string
}



async function getRecipes(): Promise<Recipe[]> {
    const result = await fetch("http://localhost:4000/recipes");
    await new Promise((resolve) => setTimeout(resolve, 3000))
    return result.json(); 
}

export default async function Home() {
  const recipes = await getRecipes();

  return (
    <main>
      <div className="grid grid-cols-3 gap-8">
        {
          recipes.map((each) =>{
            return(
                <Card key={each.id} className="flex flex-col justify-between ">
                  <CardHeader className="flex-row gap-4 items-center">
                    <Avatar>
                      <AvatarImage className="w-12 h-12 rounded-full" src={`/img/${each.image}`} alt="@shadcn" />
                      <AvatarFallback>
                        {each.title.slice(0,2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>{each.title}</CardTitle>
                      <CardDescription>{each.time} mins to cook.</CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <p>{each.description}</p>
                  </CardContent>

                  <CardFooter>
                    <div className="flex w-full justify-between ">
                      <Button >View Recipe</Button>
                      <p>{each.vegan && <Badge  variant={"secondary"}>Vegan</Badge> }</p>
                    </div>
                  </CardFooter>
              </Card>

            )
          })
        }
      </div>
    </main>
  )
}
