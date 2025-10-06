import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";

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
const getCurrentResidences = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const tenant = await prisma.manager.findUnique({
      where: { id: Number(cognitoId) },
    });
    if (!tenant) res.status(404).json({ message: "Manager don't Exists." });
    const properties = await prisma.property.findMany({
      where: { tenants: { some: { cognitoId } } },
      include: {
        location: true,
      },
    });
    const residencesWithFormattedLocation = await Promise.all(
      properties.map(async (property) => {
        const coordinates: { coordinates: string }[] =
          await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location" where id = ${property.location.id}`;

        const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || "");
        const longitude = geoJSON.coordinates[0];
        const latitude = geoJSON.coordinates[1];

        return {
          ...property,
          location: {
            ...property.location,
            coordinates: {
              longitude,
              latitude,
            },
          },
        };
      })
    );
    if (residencesWithFormattedLocation) {
      res.json(residencesWithFormattedLocation);
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: `Error retrieving manager properties: ${error.message}`,
      });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};
const addFavoriteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, propertyId } = req.params;
    const tenant = await prisma.tenant.findUnique({
      where: { cognitoId },
      include: { favorites: true },
    });
    const propertyIdNumber = Number(propertyId);
    const existingFavorites = tenant?.favorites || [];
    if (!existingFavorites.some((fav) => fav.id === propertyIdNumber)) {
      const updatedTenant = await prisma.tenant.update({
        where: { cognitoId },
        data: {
          favorites: {
            connect: { id: propertyIdNumber },
          },
        },
        include: { favorites: true },
      });
      res.json(updatedTenant);
    } else {
      res.status(409).json({ message: "Property already added as favorite." });
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: `Error adding favorite properties: ${error.message}`,
      });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};
const removeFavoriteProperty = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, propertyId } = req.params;
    const propertyIdNumber = Number(propertyId);

    const updatedTenant = await prisma.tenant.update({
      where: { cognitoId },
      data: {
        favorites: {
          disconnect: { id: propertyIdNumber },
        },
      },
      include: { favorites: true },
    });
    res.json(updatedTenant);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        message: `Error removing favorite properties: ${error.message}`,
      });
    } else {
      res.status(500).json({ message: "Unknown error occurred" });
    }
  }
};
export {
  createTenant,
  getTenant,
  updateTenant,
  getCurrentResidences,
  addFavoriteProperty,
  removeFavoriteProperty,
};
