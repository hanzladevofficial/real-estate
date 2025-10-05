import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const createTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;
    const tenant = await prisma.tenant.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
      },
    });
    res.status(201).json(tenant);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error creating tenant: ${error.message}` });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};
const getTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const tenant = await prisma.tenant.findUnique({
      where: {
        cognitoId,
      },
      include: {
        favorites: true,
      },
    });
    if (tenant) {
      res.json(tenant);
    } else {
      res.status(404).json({ mesage: "Tenant not found." });
    }
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error retrieving tenant: ${error.message}` });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};
const updateTenant = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { name, email, phoneNumber } = req.body;
    const updatedTenant = await prisma.tenant.update({
      where: {
        cognitoId,
      },
      data: {
        name,
        email,
        phoneNumber,
      },
    });
    res.status(201).json(updatedTenant);
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: `Error updating tenant: ${error.message}` });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};
export { createTenant, getTenant, updateTenant };
